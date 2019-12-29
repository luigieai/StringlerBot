import { Message, Client } from "discord.js";

export default interface CommandBase {
    run(client: Client, msg: Message, args: any[]): Promise<void>;
    readonly name: string;
    readonly aliases: string[];
    readonly description: string;
    readonly enabled: boolean;
}
