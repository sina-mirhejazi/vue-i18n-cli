import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import * as execa from 'execa'
import * as fileSystem from 'fs'
import * as Listr from 'listr'
import * as path from 'path'
import {promisify} from 'util'

import generateEn from '../samples/en'
import generateIndex from '../samples/index'
import generateDateTimeFormats from '../samples/date-time-formats'

export default class Init extends Command {
  static description = 'Initialize vue-i18n on your project'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
    {
      name: 'src',
      required: true,
      description: 'path to src folder',
    }
  ]

  async run() {
    this.config.debug = 1
    const {args} = this.parse(Init)

    await this.exec(args.src)
  }

  async exec(pathToSrc: string) {
    const tasks = new Listr([
      {
        title: 'Install package dependencies with Yarn',
        task: this.installDependenciesWithYarn,
      },
      {
        title: 'Install package dependencies with npm',
        enabled: (ctx: any) => ctx.yarn === false,
        task: this.installDependenciesWithNPM
      },
      {
        title: 'Copying necessary files',
        task: () => this.copyNecessaryFiles(pathToSrc)
      }
    ])

    await tasks.run().catch((err: Error) => {
      this.error(err)
    })

    this.log(
`
Please add these codes to your main.js
  > ${chalk.greenBright('import i18n from \'@/localization\';')}
  >
  > ${chalk.greenBright('new Vue({')}
  > ${chalk.greenBright('  i18n,')}
  > ${chalk.greenBright('  render: h => h(App),')}
  > ${chalk.greenBright('}).$mount(\'#app\');')}'
`
    )
  }

  installDependenciesWithYarn(ctx: any, task: any) {
    return execa('yarn', ['add', 'vue-i18n'])
      .catch(() => {
        ctx.yarn = false

        task.skip('Yarn not available, install it via `npm install -g yarn`')
      })
  }

  installDependenciesWithNPM() {
    return execa('npm', ['install', 'vue-i18n'])
  }

  async copyNecessaryFiles(pathToSrc: string) {
    const absoluteSrcPath = path.join(process.cwd(), pathToSrc)

    const mkdir = promisify(fileSystem.mkdir)
    const writeFile = promisify(fileSystem.writeFile)

    await mkdir(`${absoluteSrcPath}/localization/languages`, {recursive: true})

    const files = [
      {
        to: `${absoluteSrcPath}/localization/index.js`,
        content: generateIndex()
      },
      {
        to: `${absoluteSrcPath}/localization/dateTimeFormats.js`,
        content: generateDateTimeFormats(),
      },
      {
        to: `${absoluteSrcPath}/localization/languages/en.js`,
        content: generateEn()
      }
    ]

    const promises = []

    for (let file of files) {
      promises.push(
        writeFile(file.to, file.content)
      )
    }

    await Promise.all(promises)
  }
}
