import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { cmdModule } from "../../types/cmd";

const pingCmd: cmdModule = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),

    execute: (async (interaction: ChatInputCommandInteraction) => {
        await interaction.reply('Pong');
    })
};

export default pingCmd;
