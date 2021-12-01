import { REST } from "@discordjs/rest";
import { Routes, RESTPostAPIApplicationGuildCommandsJSONBody } from "discord-api-types/v9"
import { readSecret } from "./secrets";
import { getCommands } from "../command";
import { debug, error } from "../lib/log";
import { Client } from "discord.js";

const rest = new REST({ version: '9' }).setToken(readSecret("TOKEN"));

export function getGuildIDs(client: Client): string[] {
    let guildIDs: string[] = [];
    Array.from(client.guilds.cache).forEach((tuple) => {
        guildIDs.push(tuple[1].id);
    })
    return guildIDs;
}
export async function deployCommands(guildIDs: string[], clientID: string) {
    try {
        debug("Trying to deploy guild commands...");
        const commandArray = Array.from(getCommands().values());
        let commands: RESTPostAPIApplicationGuildCommandsJSONBody[] = []
        commandArray.forEach((command) => {
            commands.push(command.slashCommand.toJSON());
        })

        guildIDs.forEach(async (id) => {
            await rest.put(Routes.applicationGuildCommands(clientID, id), { body: commands})
        })
        debug("Deployed guild commands!");
    } catch (e) {
        error(`${e}`);
    }
}