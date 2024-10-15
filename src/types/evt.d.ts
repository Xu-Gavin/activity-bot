import { Client } from "discord.js";

export type evtFunc = (client: Client<true>) => void;

export interface evtModule {
    name: Events,
    once: boolean,
    execute: evtFunc
}