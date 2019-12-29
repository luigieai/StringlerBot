import Module from "../../Module";
import { Client } from "discord.js";
import OffenseCmd from "./offensecmd";
import Offense from "../../../models/Offense";

export default class OffenseModule extends Module {
    
    name: string = 'Offense';
    shortDescription: string = 'Ofenda seu amiguinho';
    description: string = 'Permite que o bot faça uma ofensa aleatória a um usuário do servidor';

    constructor(dsClient: Client) {
        super(dsClient);
        this.addCommand(new OffenseCmd(this));
    }
    
    async listaOfensas(){
        return await Offense.findAll();
    }

}