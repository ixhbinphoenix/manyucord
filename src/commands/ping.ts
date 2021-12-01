import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { command } from "../command";

const exp: command = {
    exec: async function (ctx: CommandInteraction) {
        ctx.reply("Pong!");
    },
    slashCommand: new SlashCommandBuilder().setName("ping").setDescription("Replies with pong!").setDefaultPermission(true)
}
export default exp;