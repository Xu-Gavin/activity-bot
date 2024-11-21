import { Client, ClientEvents } from "discord.js";

export type evtFunc<K extends keyof ClientEvents> = (...args: ClientEvents[K]) => void;

export interface evtModule<K extends keyof ClientEvents> {
    name: Events,
    once: boolean,
    execute: evtFunc<K>
}
