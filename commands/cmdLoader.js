import { fileURLToPath } from 'url';
import { dirname, join } from 'node:path';
import { Collection } from 'discord.js';
import { readdirSync } from 'node:fs';

const cur_dir = dirname(fileURLToPath(import.meta.url));

export async function loadCmds(client) {
    client.cmds = new Collection();
    const cmdDir = readdirSync(cur_dir).filter(file => !file.endsWith('.js'));
    for (const folder of cmdDir) {
        const cmdPaths = join(cur_dir, folder);
        const cmdFiles = readdirSync(cmdPaths).filter(file => file.endsWith('.js'));
        for (const file of cmdFiles) {
            const cmdFilePath = join(cmdPaths, file);
            const cmd = await import(cmdFilePath);
            if ('data' in cmd && 'execute' in cmd && typeof cmd.execute === 'function') {
                client.cmds.set(cmd.data.name, cmd);
                console.log(`[LOG] Loaded command '${cmd.data.name}' successfully from '${cmdFilePath}'`);
            } else {
                console.log(`[WARNING] The command at ${cmdFilePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
}