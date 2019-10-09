import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import Listr from 'listr'
import path from 'path'
import {loadTokens, printTokens} from '../utils/token'

export default class Diff extends Command {
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
      name: 'firstLanguage',
      required: true,
      description: 'first language name code'
    },
    {
      name: 'secondLanguage',
      required: true,
      description: 'second language name code'
    },
  ]

  firstLanguageTokens: any = {};
  secondLanguageTokens: any = {};

  missingTokens: Array<string> = [];
  additionalTokens: Array<string> = [];

  async run() {
    const {args} = this.parse(Diff)

    await this.exec(args.src, args.firstLanguage, args.secondLanguage)
  }

  async exec(pathToSrc: string, firstLanguage: string, secondLanguage: string) {
    const tasks = new Listr([
      {
        title: 'Loading first language content',
        task: async () => {
          const absoluteSrcPath = path.join(process.cwd(), pathToSrc, 'localization/languages', `${firstLanguage}.json`)

          this.firstLanguageTokens = await loadTokens(absoluteSrcPath)
        },
      },
      {
        title: 'Loading second language content',
        task: async () => {
          const absoluteLanguagePath = path.join(process.cwd(), pathToSrc, 'localization/languages', `${secondLanguage}.json`)

          this.secondLanguageTokens = await loadTokens(absoluteLanguagePath)
        },
      },
      {
        title: 'Finding missing tokens',
        task: async () => {
           this.checkForMissingTokens(this.firstLanguageTokens, this.secondLanguageTokens, this.missingTokens)
        }
      },
      {
        title: 'Finding additional tokens',
        task: async () => {
          this.checkForMissingTokens(this.secondLanguageTokens, this.firstLanguageTokens, this.additionalTokens)
        }
      }
    ])

    await tasks.run().catch((err: Error) => {
      this.error(err)
    })

    this.log(chalk.red.bold('Missing Tokens:'))

    printTokens(this.missingTokens, this.log)

    this.log(chalk.red.green('Adittional Tokens:'))

    printTokens(this.additionalTokens, this.log)
  }

  checkForMissingTokens(primaryContent: any, secondaryContent: any, tokens: Array<string>, path: string = '') {
    Object.keys(primaryContent)
      .forEach((key: string) => {
        let currentPath: string;

        if(path) {
          currentPath = `${path}.${key}`
        } else {
          currentPath = key
        }

        if(!secondaryContent.hasOwnProperty(key)) {
          tokens.push(currentPath);
        } else if(typeof primaryContent[key] === 'object') {
          this.checkForMissingTokens(primaryContent[key], secondaryContent[key], tokens, currentPath);
        }
      })
  }

  
}
