import chalk from "chalk";

// Constants
const error = chalk.bold.red;
const warning = chalk.hex('#FFA500');
const success = chalk.green;
const info = chalk.cyan;

export class LogManager {
    static logInfo(msg: string) {
        console.log(info("[INFO]", msg));
    }

    static logSuccess(msg: string) {
        console.log(success("[SUCCESS]", msg));
    }

    static logWarning(msg: string) {
        console.log(warning("[WARNING]", msg));
    }

    static logError(msg: string) {
        console.log(error("[ERROR]", msg));
    }
}
