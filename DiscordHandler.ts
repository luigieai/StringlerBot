import * as Discord from 'discord.js';
import CommandHandler from './discord/CommandHandler';
import AntiDelete from './discord/modules/AntiDelete';
export default class DiscordHandler {

    public readonly dsBot: Discord.Client;
    public static readonly prefix: string = '!'; //TODO configurable

    constructor(botToken:string) {
        this.dsBot = new Discord.Client();
        this.handle(botToken);
    }

    protected handle(botToken:string) {

        //Comandos
        let cmdHandler : CommandHandler = new CommandHandler(this.dsBot);
        cmdHandler.handleCommands();
        console.log(`Foram carregados ${cmdHandler.commands.size} comandos`);
        this.dsBot.login(botToken).then(() => console.log(this.dsBot.user.username));

        //eventos (TODO)
        new AntiDelete(this.dsBot).handleEvent();
    }



}