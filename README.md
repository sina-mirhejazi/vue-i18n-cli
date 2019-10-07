vue-i18n-cli
============



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/vue-i18n-cli.svg)](https://npmjs.org/package/vue-i18n-cli)
[![CircleCI](https://circleci.com/gh/sina-mirhejazi/vue-i18n-cli/tree/master.svg?style=shield)](https://circleci.com/gh/sina-mirhejazi/vue-i18n-cli/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/sina-mirhejazi/vue-i18n-cli?branch=master&svg=true)](https://ci.appveyor.com/project/sina-mirhejazi/vue-i18n-cli/branch/master)
[![Codecov](https://codecov.io/gh/sina-mirhejazi/vue-i18n-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/sina-mirhejazi/vue-i18n-cli)
[![Downloads/week](https://img.shields.io/npm/dw/vue-i18n-cli.svg)](https://npmjs.org/package/vue-i18n-cli)
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
@sina-mirhejazi/vue-i18n-cli/0.1.1 darwin-x64 node-v12.10.0
$ vue-i18n --help [COMMAND]
USAGE
  $ vue-i18n COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vue-i18n diff [FILE]`](#vue-i18n-diff-file)
* [`vue-i18n help [COMMAND]`](#vue-i18n-help-command)
* [`vue-i18n init SRC`](#vue-i18n-init-src)

## `vue-i18n diff [FILE]`

describe the command here

```
USAGE
  $ vue-i18n diff [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/diff.ts](https://github.com/sina-mirhejazi/vue-i18n-cli/blob/v0.1.1/src/commands/diff.ts)_

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

_See code: [src/commands/init.ts](https://github.com/sina-mirhejazi/vue-i18n-cli/blob/v0.1.1/src/commands/init.ts)_
<!-- commandsstop -->
