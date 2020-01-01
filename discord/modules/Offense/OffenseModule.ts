import Module from "../../Module";
import { Client, DMChannel } from "discord.js";
import OffenseCmd from "./offensecmd";
import Offense from "../../../models/Offense";
import EventBase from "../../EventBase";

export default class OffenseModule extends Module implements EventBase {

    name: string = 'Offense';
    shortDescription: string = 'Ofenda seu amiguinho';
    description: string = 'Permite que o bot faça uma ofensa aleatória a um usuário do servidor';
    deletingItem: string = '-1'; //Algum usuario que está para excluir um item.

    constructor(dsClient: Client) {
        super(dsClient);
        this.addCommand(new OffenseCmd(this));
    }

    async listaOfensas() {
        return await Offense.findAll();
    }

    handleEvent(): void {
        this.dsClient.on('message', async (msg) => {
            //Se tiver alguém deletando, e a mensagem for de quem está deletando e se a mensagem é no PV do bot
            if (this.isDeleting() && msg.author.id === this.deletingItem && msg.channel.type === 'dm') {
                //For um numero
                let mapID: number = Number.parseInt(msg.content);
                if (mapID) {
                    console.log(mapID);
                    let ofensas: Offense[] = await this.listaOfensas();
                    await ofensas.forEach((element, index) => {
                        console.log(index);
                        if (index == mapID) {
                            this.deletaOfensa(element);
                            msg.reply(element.name);
                            //Já que deleatmos, nenhum usuario irá mexer mais, e assim liberamos a lista para outro
                            this.deletingItem = '-1';
                        }
                    });

                } else {
                    msg.reply('Por favor digite o número correspondente cujo você quer deletar');
                }
            }
        });
    }

    async deletaOfensa(ofensa: Offense) {
        await ofensa.destroy();
    }

    setWhoIsDeleting(userID: string) {
        this.deletingItem = userID
    }

    isDeleting(): boolean {
        return this.deletingItem != '-1';
    }

}