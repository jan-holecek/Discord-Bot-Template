import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'

module.exports = {
    type: "information",
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Show bot ping."),
    async execute(interaction: any): Promise<any> {
        const sent = await interaction.reply({ content: "Pinging...", fetchReply: true })

        const pingEmbed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle(":ping_pong: Pong")
            .addFields(
                { name: "Bot latency", value: `\`${sent.createdTimestamp - interaction.createdTimestamp}ms\`` },
                { name: "Discord API latency", value: `\`${interaction.client.ws.ping}ms\`` },
            )
            .setTimestamp()
            .setFooter({ text: `${interaction.user.tag}`})

        await interaction.editReply({ embeds: [pingEmbed] })
    },
};