import { cmdModule } from "types/declarations/cmd";

export function isCmdModule(cmd: any): cmd is cmdModule {
    return (
        typeof cmd === 'object' &&
        cmd !== null &&
        typeof cmd.data === 'object' &&
        cmd.data != null &&
        typeof cmd.data.name === 'string' &&
        typeof cmd.data.description  === 'string' &&
        typeof cmd.execute === 'function'
    );
}
