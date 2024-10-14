// Imports
import fs from 'node:fs';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { loadActivateCmds } from './commands/cmdHandler.js';

// Constants
const client: Client<boolean> = new Client({ intents: [GatewayIntentBits.Guilds] })
const { token }: { token: string } = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

// Main Script
loadActivateCmds(client);

client.once(Events.ClientReady, readyClient => {
    console.log(`[LOG] Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(token);
