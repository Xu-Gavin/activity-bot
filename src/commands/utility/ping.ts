import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { cmdModule } from "types/declarations/cmd";
import { LogManager } from "utility/logManager";

const pingCmd: cmdModule = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),

    execute: (async (interaction: ChatInputCommandInteraction) => {
        await interaction.reply('Pong');
        LogManager.logSuccess(`Received a ping from '${interaction.member?.user.username}', replied with pong`)
    })
};

export default pingCmd;
