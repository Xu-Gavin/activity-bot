import { Client, Events } from "discord.js";
import { evtModule } from "../../types/evt"

const readyEvt: evtModule = {
    name: Events.ClientReady,
    once: true,
    execute: (readyClient: Client<true>) => {
        console.log(`[LOG] Ready! Logged in as ${readyClient.user.tag}`);
    }
}

export default readyEvt;
