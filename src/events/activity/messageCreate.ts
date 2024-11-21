import { Events, Message } from "discord.js";
import { evtModule } from "types/declarations/evt"
import { LogManager } from "utility/logManager";

const messageCreateEvt: evtModule<Events.MessageCreate> = {
    name: Events.MessageCreate,
    once: false,
    execute: (message: Message) => {
        LogManager.logInfo(`Received message from ${message.author.username}: "${message.content}"`);
    }
}

export default messageCreateEvt;

