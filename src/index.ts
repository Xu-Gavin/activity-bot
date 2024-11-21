// Imports
import fs from 'node:fs';
import { Client, GatewayIntentBits } from 'discord.js';
import { loadActivateCmds } from 'commands/cmdHandler.ts';
import { loadActivateEvts } from 'events/evtHandler.ts';

// Constants
const client: Client<boolean> = new Client({ intents: [GatewayIntentBits.Guilds] })
const { token }: { token: string } = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

// Main Script
loadActivateCmds(client);
loadActivateEvts(client);

client.login(token);
