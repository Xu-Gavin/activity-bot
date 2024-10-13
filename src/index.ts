// Imports
import fs from 'node:fs';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { loadCmds } from './commands/cmdLoader.js';

// Constants
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
const { token } = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

// Main Script
loadCmds(client);

client.once(Events.ClientReady, readyClient => {
    console.log(`[LOG] Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(token);
