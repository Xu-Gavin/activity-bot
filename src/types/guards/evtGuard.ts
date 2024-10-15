import { Events } from "discord.js";
import { evtModule } from "../declarations/evt";

export function isEvtModule(event: any): event is evtModule {
    return (
        event.name !== undefined &&
        Object.values(Events).includes(event.name) &&
        event.once !== undefined &&
        event.execute !== undefined &&
        typeof event.execute === 'function'
    );
}
