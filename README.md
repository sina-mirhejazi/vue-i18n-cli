vue-i18n-cli
============

[![Downloads/week](https://img.shields.io/npm/dw/@sina-mirhejazi/vue-i18n-cli.svg)](https://npmjs.org/package/@sina-mirhejazi/vue-i18n-cli)
[![License](https://img.shields.io/npm/l/vue-i18n-cli.svg)](https://github.com/sina-mirhejazi/vue-i18n-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @sina-mirhejazi/vue-i18n-cli
$ vue-i18n COMMAND
running command...
$ vue-i18n (-v|--version|version)
@sina-mirhejazi/vue-i18n-cli/0.2.0 darwin-x64 node-v12.11.1
$ vue-i18n --help [COMMAND]
USAGE
  $ vue-i18n COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vue-i18n diff SRC FIRSTLANGUAGE SECONDLANGUAGE`](#vue-i18n-diff-src-firstlanguage-secondlanguage)
* [`vue-i18n help [COMMAND]`](#vue-i18n-help-command)
* [`vue-i18n init SRC`](#vue-i18n-init-src)

## `vue-i18n diff SRC FIRSTLANGUAGE SECONDLANGUAGE`

describe the command here

```
USAGE
  $ vue-i18n diff SRC FIRSTLANGUAGE SECONDLANGUAGE

ARGUMENTS
  SRC             path to src folder
  FIRSTLANGUAGE   first language name code
  SECONDLANGUAGE  second language name code

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/diff.ts](https://github.com/sina-mirhejazi/vue-i18n-cli/blob/v0.2.0/src/commands/diff.ts)_

## `vue-i18n help [COMMAND]`

display help for vue-i18n

```
USAGE
  $ vue-i18n help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `vue-i18n init SRC`

Initialize vue-i18n on your project

```
USAGE
  $ vue-i18n init SRC

ARGUMENTS
  SRC  path to src folder

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/init.ts](https://github.com/sina-mirhejazi/vue-i18n-cli/blob/v0.2.0/src/commands/init.ts)_
<!-- commandsstop -->
