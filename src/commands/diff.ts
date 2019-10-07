import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import execa from 'execa'
import fileSystem from 'fs'
import Listr from 'listr'
import path from 'path'
import {promisify} from 'util'
import { async } from 'rxjs/internal/scheduler/async';

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
    this.config.debug = 1

    const {args, flags} = this.parse(Diff)

    await this.exec(args.src, args.firstLanguage, args.secondLanguage)
  }

  async exec(pathToSrc: string, firstLanguage: string, secondLanguage: string) {
    const tasks = new Listr([
      {
        title: 'Loading first language content',
        task: async () => {
          const absoluteSrcPath = path.join(process.cwd(), pathToSrc, 'localization/languages', `${firstLanguage}.json`)

          this.firstLanguageTokens = await this.loadFile(absoluteSrcPath)
        },
      },
      {
        title: 'Loading second language content',
        task: async () => {
          const absoluteSrcPath = path.join(process.cwd(), pathToSrc, 'localization/languages', `${secondLanguage}.json`)

          this.secondLanguageTokens = await this.loadFile(absoluteSrcPath)
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

    this.printTokens(this.missingTokens)

    this.log(chalk.red.green('Adittional Tokens:'))

    this.printTokens(this.additionalTokens)
  }

  async loadFile(pathToFile: string) {
    const readFile = promisify(fileSystem.readFile);

    const rawData = await readFile(pathToFile, 'utf-8')

    return JSON.parse(rawData)
  }

  checkForMissingTokens(primaryContent: any, secondaryContent: any, tokens: Array<string>, path: string = '') {
    Object.keys(primaryContent)
      .forEach((key: string) => {
        const currentPath = `${path}.${key}`;

        if(!secondaryContent.hasOwnProperty(key)) {
          tokens.push(currentPath);
        } else if(typeof primaryContent[key] === 'object') {
          this.checkForMissingTokens(primaryContent[key], secondaryContent[key], tokens, currentPath);
        }
      })
  }

  printTokens(token: Array<string>) {
    if(!token.length) {
      this.log(chalk.bgWhite.black('Nothing to show'));
      return;
    }
  
    token.forEach((item, index) => {
      this.log(`${index+1}. %s`, chalk.bgWhite.black(item.substr(1)));
    });
  }
}
