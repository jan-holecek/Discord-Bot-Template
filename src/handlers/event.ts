import { client } from "../index";
import fs from "node:fs";
import path from "node:path";

export default class EventHandler {
    static load(): void {
        const eventsPath: string = path.join(__dirname, '../events')
        const eventFiles: string[] = fs.readdirSync(eventsPath).filter((file: any) => file.endsWith('.js'))

        for (const file of eventFiles) {
            const filePath: string = path.join(eventsPath, file)
            const event = require(filePath)

            if (event.once) {
                client.once(event.name, (...args: any) => event.execute(...args))
            } else {
                client.on(event.name, (...args: any) => event.execute(...args))
            }
        }
    }
}