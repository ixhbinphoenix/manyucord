import { CommandInteraction } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders";
import { readdirSync } from "fs"

type commandExec = (interaction: CommandInteraction) => Promise<void>;
export interface command {
    exec: commandExec;
    slashCommand: SlashCommandBuilder
}

export function getCommands(): Map<string, command> {
    const dir = readdirSync(__dirname + "/commands").filter((str) => str.endsWith(".js"));
    let commands = new Map<string, command>();
    dir.forEach((file) => {
        var cmd: command = require(__dirname + "/commands/" + file).default;
        file = file.slice(0, -3);
        commands.set(file, cmd);
    })
    return commands;
}

