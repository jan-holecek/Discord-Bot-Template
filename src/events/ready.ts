const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client: any): void {
        console.log(`Bot ${client.user.tag} is online`)
        client.user!.setPresence({ activities: [{ name: `${client.user.username} is best`}]})
    },
};
