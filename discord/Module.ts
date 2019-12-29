import CommandBase from "./CommandBase";
import { Client } from "discord.js";

export default abstract class Module {

    readonly abstract name : string;
    readonly abstract shortDescription : string;
    readonly abstract description : string;
    readonly commands: CommandBase[];
    readonly dsClient: Client;
    //TODO provavlemente adicionar um sistema de permissões ou algo do tipo

    constructor(dsClient: Client){
        this.dsClient = dsClient;
        this.commands = [];
    }

    addCommand(cmd: CommandBase){
        this.commands.push(cmd);
    }

}