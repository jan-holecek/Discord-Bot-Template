import { GatewayIntentBits, Client } from "discord.js";
import env from "dotenv";
import SlashHandler from "./handlers/slashCommands";
import EventHandler from "./handlers/event";

export const client: Client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
    ],
})

env.config()

SlashHandler.deployCommands("guild")
EventHandler.load()

client?.login(process.env["TOKEN"])

