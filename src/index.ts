import { Client, Intents, Interaction } from "discord.js";
import { info, error } from "./lib/log";
import "./command";
import { getCommands } from "./command";
import { readSecret } from "./utils/secrets";
import { deployCommands, getGuildIDs } from "./utils/deploy";

export const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
});

client.once('ready', () => {
    deployCommands(getGuildIDs(client), client.application?.id as string);
    info("manyucord ready");
})

client.on('interactionCreate', async (interaction: Interaction) => {
    if (interaction.isCommand()) {
        if (!getCommands().has(interaction.commandName)) {
            error("Tried to call a command that is not registered");
            interaction.reply("There was an error trying to execute this command!");
        }
        getCommands().get(interaction.commandName)?.exec(interaction).catch((err) => {
            error(`There was an error trying to execute command ${interaction.commandName}:\n${err}`);
            interaction.reply("There was an error trying to execute this command!");
        });
    }
}) 

client.login(readSecret("TOKEN"));