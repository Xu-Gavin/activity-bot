import { Events, VoiceState } from "discord.js";
import { evtModule } from "types/declarations/evt"
import { LogManager } from "utility/logManager";

const voiceStateEvt: evtModule<Events.VoiceStateUpdate> = {
    name: Events.VoiceStateUpdate,
    once: false,
    execute: (oldState: VoiceState, newState: VoiceState) => {
        LogManager.logInfo(`Voice state update of user ${oldState.member?.user.username}`)
    }
}

export default voiceStateEvt;

