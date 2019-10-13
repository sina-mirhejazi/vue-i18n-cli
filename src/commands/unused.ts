import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import Listr from 'listr'
import path from 'path'
import { exec } from 'child_process';
import {loadTokens, printTokens} from '../utils/token'

export default class Unused extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
    {
      name: 'src',
      required: true,
      description: 'path to src folder',
    },
    {
      name: 'language',
      required: true,
      description: 'language name code'
    },
  ]

  rawTokens: any = {}
  tokens: Array<string> = []
  unusedTokens: Array<string> = []

  async run() {
    const {args} = this.parse(Unused)

    await this.exec(args.src, args.language)
  }

  async exec(pathToSrc: string, language: string) {
    const tasks = new Listr([
      {
        title: 'Loading language content',
        task: async () => {
          const absoluteSrcPath = path.join(process.cwd(), pathToSrc, 'localization/languages', `${language}.json`)

          this.rawTokens = await loadTokens(absoluteSrcPath)
        },
      },
      {
        title: 'Making tokens',
        task: async () => {
          this.makeTokens(this.rawTokens)
        },
      },
      {
        title: 'Looking for usages',
        task: async () => {
          const absoluteSrcPath = path.join(process.cwd(), pathToSrc)

          for(let token of this.tokens) {
            await this.checkFiles(token, absoluteSrcPath)
          }
        }
      }
    ])

    await tasks.run().catch((err: Error) => {
      this.error(err)
    })

    if(!this.unusedTokens.length) {
      this.log(chalk.red.green('There is no unused token.'))
    } else {
      this.log(chalk.red.bold(`Unused Tokens: ${this.unusedTokens.length}/${this.tokens.length}`))

      printTokens(this.unusedTokens, this.log)
    }
  }

  makeTokens(rawTokens: any, path: string = '') {
    Object.keys(rawTokens)
    .forEach((key) => {
      let currentPath: string;

      if(path) {
        currentPath = `${path}.${key}`
      } else {
        currentPath = key
      }

      if(typeof rawTokens[key] === 'object') {
        this.makeTokens(rawTokens[key], currentPath);
      } else {
        this.tokens.push(currentPath);
      }
    });
  }

  checkFiles(token: string, pathToSrc: string) {
    return new Promise((resolve) => {
      exec(`grep -o -a -h -m 1 -r "'${token}'" ${pathToSrc} | head -1`, (err, stdout) => {
        if(err || !stdout.length) {
          this.unusedTokens.push(token);
        }

        resolve()
      });
    })
  }
}
