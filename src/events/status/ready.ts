import { Client, Events } from "discord.js";
import { evtModule } from "types/declarations/evt"
import { LogManager } from "utility/logManager";

const readyEvt: evtModule = {
    name: Events.ClientReady,
    once: true,
    execute: (readyClient: Client<true>) => {
        LogManager.logSuccess(`Ready! Logged in as ${readyClient.user.tag}`);
    }
}

export default readyEvt;
