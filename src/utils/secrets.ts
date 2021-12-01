import { warn, info } from "../lib/log";
import * as dotenv from "dotenv";
import {createInterface} from "readline";

export function readSecret(name: string): string {
    let ret: string = "";
    dotenv.config();
    if (process.env[name]) {
        return process.env[name] as string;
    } else {
        warn("TOKEN not in environment variables, getting token from stdin");
        info("To obtain a bot token, go to https://discord.com/developers and create a bot application");
        var rl = createInterface(process.stdin, process.stdout);
        rl.setPrompt(`${name}: `); rl.prompt();
        rl.on('line', (input: string) => {
            rl.close();
            console.clear();
            ret = input;
        })
    }
    return ret;

}