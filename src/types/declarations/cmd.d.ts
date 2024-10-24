import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export type cmdName = string;
export type cmdData = SlashCommandBuilder;
export type cmdFunc = (interaction: ChatInputCommandInteraction) => Promise<void>;

export interface cmdModule {
    data: cmdData;
    execute: cmdFunc;
}
