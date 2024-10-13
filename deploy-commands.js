import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { REST, Routes } from 'discord.js';
import { dirname, join } from 'node:path';

const { clientId, guildId, token } = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const commands = [];
const __dirname = dirname(fileURLToPath(import.meta.url));
const foldersPath = join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath).filter(file => !file.endsWith('.js'));

for (const folder of commandFolders) {
    const commandsPath = join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = join(commandsPath, file);
        const command =  await import(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`Starting refreshing ${commands.length} application (/) commands.`);
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
        );
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.log(error);
    }
})();