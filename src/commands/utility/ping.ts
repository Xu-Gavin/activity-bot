import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { slashCmdModule } from "../../types/cmd";

const pingCmd: slashCmdModule = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),

    execute: (async (interaction: ChatInputCommandInteraction) => {
        await interaction.reply('Pong');
    })
};

export default pingCmd;