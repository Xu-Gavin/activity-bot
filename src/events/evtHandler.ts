import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from 'discord.js';
import { isEvtModule } from 'types/guards/evtGuard';

const evtDir = dirname(fileURLToPath(import.meta.url));

export async function loadActivateEvts(client: Client<boolean>) {
    const evtDirContents = readdirSync(evtDir)
        .filter(file => !file.endsWith('.js') && !file.endsWith('.ts'));
    for (const dir of evtDirContents) {
        const evtPath = join(evtDir, dir)
        const evtFiles = readdirSync(evtPath)
            .filter(file => file.endsWith('.js') || file.endsWith('.ts'));
        for (const file of evtFiles) {
            const evtFilePath = join(evtPath, file)
            const event = (await import(evtFilePath)).default;
            if (isEvtModule(event)) {
                if (event.once) {
                    client.once(event.name, event.execute);
                } else {
                    client.on(event.name, event.execute);
                }
                console.log(`[LOG] Activated event listening ${event.once ? 'once': 'continuously'} for '${event.name}' successfully from '${evtFilePath}'`);
            } else {
                console.log(`[WARNING] The event at ${evtFilePath} was not activated as it does not adhere to the evtModule interface.`);
            }
        }
    }
}
