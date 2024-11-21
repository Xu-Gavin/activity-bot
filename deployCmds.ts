import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { APIApplicationCommand, REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';
import { dirname, join } from 'node:path';
import { LogManager } from './src/utility/logManager'

const { clientId, guildId, token } = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const cmds: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
const __dirname = dirname(fileURLToPath(import.meta.url));
const foldersPath = join(__dirname, 'src', 'commands');
const cmdFolders = fs.readdirSync(foldersPath)
    .filter(file => !file.endsWith('.js') && !file.endsWith('.ts'));

for (const folder of cmdFolders) {
    const cmdsPath = join(foldersPath, folder);
    const cmdFiles = fs.readdirSync(cmdsPath)
        .filter(file => file.endsWith('.js') || file.endsWith('.ts'));
    for (const file of cmdFiles) {
        const filePath = join(cmdsPath, file);
        const cmd = (await import(filePath)).default as import('./src/types/declarations/cmd').cmdModule;
        if (cmd) {
            cmds.push(cmd.data.toJSON());
        } else {
            LogManager.logWarning(`The cmd at ${filePath} was not loaded as it does not adhere to the slashCmdModule interface.`)
        }
    }
}

const rest = new REST().setToken(token);

(async () => {
    try {
        LogManager.logInfo(`Starting refreshing ${cmds.length} application (/) cmds.`)
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: cmds }
        ) as APIApplicationCommand[];
        LogManager.logSuccess(`Successfully reloaded ${data.length} application (/) cmds.`);
    } catch (error) {
        let msg: string = 'There was an undefined error while executing a command!';
        if (error instanceof Error) msg = error.message;
        LogManager.logError(msg);
    }
})();
