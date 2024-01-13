import {
    Collection,
    REST,
} from "discord.js";
import fs from "fs";
import { client } from "../index";
import { Routes } from 'discord-api-types/v10';
import path from "node:path";
import config from "../config.json";

export default class SlashHandler {
    static deployCommands(type: string): void {
        const rest: REST = new REST({ version: "10" }).setToken(`${process.env["TOKEN"]}`)
        const commandList = this.loadAllCommands()

        switch (type) {
            case "all":
                rest.put(Routes.applicationCommands(config.botId), {
                    body: commandList
                }).then((data: any): void => {
                    console.log(`${data.length} commands loaded successfully!\n--------------------`)
                }).catch((e: any): void => {
                    console.log(e)
                })
                break
            case "guild":
                rest.put(Routes.applicationGuildCommands(config.botId, config.guildId), {
                    body: commandList
                }).then((data: any): void => {
                    console.log(`${data.length} commands loaded successfully!\n--------------------`)
                }).catch((e: any): void => {
                    console.log(e)
                })
                break
        }
    }

    static loadAllCommands(): any[] {
        // @ts-ignore
        client.commands = new Collection();
        let slashCommandsListPath: string[] = this.getCommands()
        let commandList: any[] = []

        for (const filePath of slashCommandsListPath) {
            const command = require(filePath)

            if ('data' in command && 'execute' in command) {
                // @ts-ignore
                client.commands.set(command.data.name, command)
                commandList.push(command.data.toJSON())
            }
            console.log(`Command ${command.data.name.toUpperCase()} has been loaded!`)
        }
        console.log("--------------------")

        return commandList
    }

    static getCommands(): string[] {
        const commandsPath: string = path.join(__dirname, "../commands")
        const folderFilesOrFolders: string[] = fs.readdirSync(commandsPath)
        const filesPath: string[] = []

        folderFilesOrFolders.forEach((file: string): void => {
            if (file.endsWith(".js")) filesPath.push(path.join(__dirname, `../commands/${file}`))
            else {
                const folderPath: string = path.join(__dirname, `../commands/${file}/`)
                const filesInFolder: string[] = fs.readdirSync(folderPath)

                filesInFolder.forEach((fileInFolder) => {
                    filesPath.push(path.join(__dirname, `../commands/${file}/${fileInFolder}`))
                })
            }
        })

        return filesPath
    }
}
