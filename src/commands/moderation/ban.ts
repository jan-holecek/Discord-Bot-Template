import { SlashCommandBuilder } from 'discord.js'

module.exports = {
    type: "moderation",
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban"),
    async execute(interaction: any): Promise<any> {
        await interaction.reply("Ban")
    },
};