import { Client, Message } from "discord.js";
import CommandBase from "./CommandBase";
import DiscordHandler from "../DiscordHandler";
import { EMSGSIZE } from "constants";

export default class CommandHandler {
    readonly dsClient: Client;
    readonly commands: Map<String, CommandBase>;
    readonly aliases: Map<String, String>;

    constructor(dsClient: Client, commands: Map<String, CommandBase>, aliases: Map<String, String>) {
        this.dsClient = dsClient;
        this.commands = commands;
        this.aliases = aliases;
    }

    public handleCommands() {
        this.dsClient.on('message', (message: Message) => {
            if (message.author.bot) return;
            if (!message.content.startsWith(DiscordHandler.prefix)) {
                //handleNoCmd(bot, message);
                return;
            }
            if (message.content.indexOf(DiscordHandler.prefix) !== 0) return;
            let args = message.content.split(/ +/g);
            let command: String = args.shift().slice(DiscordHandler.prefix.length).toLowerCase();
            let cmd: CommandBase = this.commands.get(command) || this.commands.get(this.aliases.get(command));
            if (cmd) {
                if (!cmd.enabled) return;
                cmd.run(this.dsClient, message, args);
            }
        });
    }

}