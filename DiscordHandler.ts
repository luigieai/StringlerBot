import * as Discord from 'discord.js';
import * as fs from 'fs';
import CommandBase from './discord/CommandBase';
import CommandHandler from './discord/CommandHandler';
export default class DiscordHandler {

    public readonly dsBot: Discord.Client;
    public readonly commands: Map<String, CommandBase>;
    public readonly aliasess: Map<String, String>;
    public static readonly prefix: string = '!'; //TODO configurable
    

    constructor(botToken:string) {
        this.dsBot = new Discord.Client();
        this.commands = new Map();
        this.aliasess = new Map();
        this.handle(botToken);
    }

    protected handle(botToken:string) {
        //constantes    
        const cmdPath: string = "./discord/commands/";
        const eventPath: string = "./discord/events/";

        //Comandos
        fs.readdir(cmdPath, (err, files) => {
            if (err) console.error(err);
            let cont: number = 0;
            files.forEach(f => {
                if (f.split(".").slice(-1)[0] !== "js" || f.split(".")[0] == "map") return;
                let preprops: any = require(`./discord/commands/${f}`).default;
                let props = new preprops() as CommandBase;
                if (props.enabled) {
                    //cmd
                    this.commands.set(props.name.toLocaleLowerCase(), props);
                    //args
                    props.aliases.forEach(alias => {
                        this.aliasess.set(alias, props.name.toLocaleLowerCase());
                    });
                    cont++;
                }

            });
            console.log(`Foi carregado um total de ${cont} comandos.`);
            new CommandHandler(this.dsBot, this.commands, this.aliasess).handleCommands();

        });

        this.dsBot.login(botToken);
    }

    static 


}