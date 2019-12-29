import CommandBase from "../../CommandBase";
import { Client, Message, Snowflake, TextChannel, DMChannel } from "discord.js";
import { Sequelize } from "sequelize-typescript";
import Offense from "../../../models/Offense";
import * as Pagination from 'discord-paginationembed';
import OffenseModule from "./OffenseModule";

export default class OffenseCmd implements CommandBase {
    modulo : OffenseModule;

    constructor(modulo : OffenseModule) { 
        this.modulo = modulo;
    }

    async run(client: Client, msg: Message, args: any[]): Promise<void> {
        let emojiSob : string = '😭';
        let m : string = 'To offend someone, use !offense [User]\n';
        m += 'To add an offense: !offense add [offense]\n'
        m += 'You can use {user} as placeholder for Username in offense creation\n'
        if(args.length == 0){ 
            msg.channel.send(m);
        } 
        else if(args.length == 1){
            //Só verificar se o jumento quer adicionar
            if(args[0] === 'add'){
                msg.react(emojiSob);
                msg.channel.send('To add an offense: !offense add [offense]\nYou can use {user} as placeholder for Username in offense creation');
                return;
            } else if(args[0] === 'list' || args[0] === 'lista'){
                //Abrir o pv do cabra
                let privadoDoCabra = await msg.author.createDM();
                //Pega a lista de ofensas
                let ofensas : Offense[] = await this.modulo.listaOfensas();
                const lista = new Pagination.FieldsEmbed()
                .setArray(ofensas)
                .setAuthorizedUsers([msg.author.id])
                .setChannel(privadoDoCabra)
                .setElementsPerPage(10)
                .setPageIndicator(true)
                .formatField("Listinha", item => (item as Offense).name.replace('{user}','<@'+msg.author.id+'>')+ '\n');
            
                lista.embed
                .setColor(0x824aee)
                .setTitle('Lista de ofensas')
                .setDescription('Mostra uma lista de ofensas que já foram criadas');

                msg.reply(`I've sent the list in your private text channel`);

                lista.build();
                return;
            }
            //Verificar se tem mais de uma mention
            if(msg.mentions.members.size == 0){
                msg.react(emojiSob);
                msg.reply(`I'm sorry, but you need to mention someone to offend!`);
                return;
            }
            if(msg.mentions.members.size > 1){
                msg.react(emojiSob);
                msg.reply(`I'm sorry, but you can only mention one user to offend!`);
                return;
            }

            //Agora sim podemos ofender a vontade!
            let result : Offense = await Offense.findOne({
                where: {approved: true},
                order: [Sequelize.fn('RAND')]
            });
            if(result == null){ //Achou nada
                msg.reply(`Sorry, but i don't have any offense right now :sob: \n` 
                +`You can add an offense using !offense add [offense]`);
                return;
            }
            let finalMsg : string = result.name.replace('{user}','<@'+msg.mentions.members.first().user.id+'>');
            msg.channel.send(finalMsg);
        }
        else if(args.length >= 2){
            if(args[0] === 'add'){ 
                //Agora bora adicionar
                let ofensa : string = args.slice(1).join(" ")
                let autor : string = msg.author.id;  
                let data : Date = new Date(); //Cria uma nova data com o tempo atual do sistema
                let aprovado : boolean = true;//    MUDAR PRA FALSE DPS
                let obj = new Offense({name: ofensa, creator: autor,
                                         creation: data, approved: aprovado});
                await obj.save();
                msg.reply('Offense created successfully! Currently waiting approvation from administrator.');
            } else if(args[0] === 'list' || args[0] === 'lista'){
                console.log('passou aqui?');
              return;
            }
             else{
                 console.log('e aqui?');
                let m : string = 'To offend someone, use !offense [User]\n';
                m += 'To add an offense: !offense add [offense]\n'
                m += 'You can use {user} as placeholder for Username in offense creation\n'
                msg.channel.send(m);
            }
        }
    }
//!ofensa list

    readonly name = "offense";
    readonly aliases = ['ofensa'];
    readonly description = "Generate an random offense!";
    readonly enabled = true;
}
