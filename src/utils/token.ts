import chalk from 'chalk'

export async function loadTokens(pathToFile: string) {
    return (await import(pathToFile)).default
}

export function printTokens(token: Array<string>, logger: Function) {
    if(!token.length) {
        logger(chalk.bgWhite.black('Nothing to show'));
        return;
    }

    token.forEach((item, index) => {
        logger(`${index+1}. %s`, chalk.bgWhite.black(item));
    });
}