import { fileURLToPath } from 'url';
import { dirname, join } from 'node:path';
import { Client, Collection, Events } from 'discord.js';
import { readdirSync } from 'node:fs';
import { cmdFunc, cmdName } from '../types/declarations/cmd';
import { isCmdModule } from '../types/guards/cmdGuard';

const cur_dir = dirname(fileURLToPath(import.meta.url));

export async function loadActivateCmds(client: Client<boolean>) {
    const cmds = loadCmds();
    activateCmds(await cmds, client);
}

async function loadCmds(): Promise<Collection<cmdName, cmdFunc>> {
    const cmds = new Collection<cmdName, cmdFunc>();
    const cmdDir = readdirSync(cur_dir)
        .filter(file => !file.endsWith('.js') && !file.endsWith('.ts'));
    for (const folder of cmdDir) {
        const cmdPaths = join(cur_dir, folder);
        const cmdFiles = readdirSync(cmdPaths)
            .filter(file => file.endsWith('.js') || file.endsWith('.ts'));
        for (const file of cmdFiles) {
            const cmdFilePath = join(cmdPaths, file);
            const cmd = (await import(cmdFilePath)).default;
            if (isCmdModule(cmd)) {
                cmds.set(cmd.data.name, cmd.execute);
                console.log(`[LOG] Loaded command '${cmd.data.name}' successfully from '${cmdFilePath}'`);
            } else {
                console.log(`[WARNING] The command at ${cmdFilePath} was not loaded as it does not adhere to the cmdModule interface.`);
            }
        }
    }
    return cmds;
}

async function activateCmds(cmds: Collection<cmdName, cmdFunc>, client: Client<boolean>) {
    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;
        const command = cmds.get(interaction.commandName);

        if (!command) {
            console.error(`[ERROR] No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command(interaction);
        } catch (error) {
            console.error(error);
            const errMsg = { content: '[ERROR] There was an error while executing this command!', ephemeral: true }
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(errMsg);
            } else {
                await interaction.reply(errMsg);
            }
        }
    });
}
