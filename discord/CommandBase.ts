import { Message, Client } from "discord.js";

export default interface CommandBase {
    run(client: Client, msg: Message, args: any[]): void;
    readonly name: string;
    readonly aliases: string[];
    readonly description: string;
    readonly usage: string; //Sera q precisa de um usage?
    readonly enabled: boolean;
}
