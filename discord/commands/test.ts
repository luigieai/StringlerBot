import CommandBase from './../CommandBase';
import { Client, Message } from 'discord.js';
export default class Test implements CommandBase {
    constructor() { };
    run(client: Client, msg: Message, args: any[]): void {
        msg.reply('VAI TOMAR NO CU @Nucky_');
    }
    readonly name = "test";
    readonly aliases = ['a'];
    readonly description = "desc";
    readonly enabled = false;
    readonly usage = "/cuceta";


}