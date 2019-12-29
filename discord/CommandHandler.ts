import { Client, Message } from "discord.js";
import CommandBase from "./CommandBase";
import DiscordHandler from "../DiscordHandler";
import ModuleHandler from "./ModuleHandler";
import Module from "./Module";

export default class CommandHandler {
    readonly dsClient: Client;
    readonly commands: Map<String, CommandBase> = new Map();
    readonly aliases: Map<String, String> = new Map();
    private  mdHandler: ModuleHandler;

    constructor(dsClient: Client, mdHandler: ModuleHandler) {
        this.dsClient = dsClient;
        this.mdHandler = mdHandler;
        this.injectModules();
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

    private injectModules(){
        //A gente faz um loop pelos módulos
        this.mdHandler.modules.forEach((md : Module) => {
            //Se o módulo tiver comandos a gente faz outro loop nele
            if(md.commands.length > 0){
                //Para cada comando do módulo, a gente registra o comando no Handler juntamente com os aliases
                md.commands.forEach((cmd : CommandBase) => {
                    this.commands.set(cmd.name.toLocaleLowerCase(), cmd);
                    cmd.aliases.forEach((items) => this.aliases.set(items, cmd.name.toLocaleLowerCase())); 
                });
            }
        });
    }

}