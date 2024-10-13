// Imports
import fs from 'node:fs';
import { Client, Events, GatewayIntentBits } from 'discord.js';

// Constants
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
const { token } = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

// Main Script
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(token);