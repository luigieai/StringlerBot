import { Client, Message } from "discord.js";
import CommandBase from "./CommandBase";
import DiscordHandler from "../DiscordHandler";
import OffenseCmd from "./commands/offensecmd";

export default class CommandHandler {
    readonly dsClient: Client;
    readonly commands: Map<String, CommandBase> = new Map();
    readonly aliases: Map<String, String> = new Map();

    constructor(dsClient: Client) {
        this.dsClient = dsClient;
        this.addCommand(new OffenseCmd());
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

    public addCommand(cmd : CommandBase){
        this.commands.set(cmd.name.toLocaleLowerCase(), cmd);
        cmd.aliases.forEach((items) => this.aliases.set(items, cmd.name.toLocaleLowerCase())); //Não podemos nos esquecer dos aliases
    }

}