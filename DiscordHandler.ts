import * as Discord from 'discord.js';
import CommandHandler from './discord/CommandHandler';
import ModuleHandler from './discord/ModuleHandler';
export default class DiscordHandler {

    public readonly dsBot: Discord.Client;
    public static readonly prefix: string = '!'; //TODO configurable

    constructor(botToken:string) {
        this.dsBot = new Discord.Client();
        this.handle(botToken);
    }

    protected handle(botToken:string) {
        //Modulos
        let moduleHandler : ModuleHandler = new ModuleHandler(this.dsBot);
        //Comandos
        let cmdHandler : CommandHandler = new CommandHandler(this.dsBot, moduleHandler);
        cmdHandler.handleCommands();
        console.log(`Foram carregados ${moduleHandler.modules.size} modulos`);
        console.log(`Foram carregados ${cmdHandler.commands.size} comandos`);
        this.dsBot.login(botToken).then(() => console.log(this.dsBot.user.username));
    }



}