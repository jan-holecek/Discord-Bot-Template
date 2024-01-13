import { Events } from "discord.js";

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction: any): Promise<any> {
        if (!interaction.isChatInputCommand()) return

        const command = interaction.client.commands.get(interaction.commandName)

        if (!command) {
            console.error(`No command found matching ${interaction.commandName}.`)
            return
        }

        try {
            await command.execute(interaction)
        } catch (error) {
            console.error(`An error occurred with the command: ${interaction.commandName}`)
            console.error(error)
        }
    },
};