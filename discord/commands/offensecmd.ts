import CommandBase from "../CommandBase";
import { Client, Message, Snowflake } from "discord.js";
import { Sequelize } from "sequelize-typescript";
import Offense from "../../models/Offense";

export default class OffenseCmd implements CommandBase {

    constructor() { }

    run(client: Client, msg: Message, args: any[]): void {
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
                return
            }

            //Agora sim podemos ofender a vontade!
            Offense.findOne({
                where: {approved: true},
                order: [Sequelize.fn('RAND')]
            }).then(result => {
                if(result == null){ //Achou nada
                    msg.reply(`Sorry, but i don't have any offense right now :sob: \n` 
                    +`You can add an offense using !offense add [offense]`);
                    return;
                }
                let finalMsg : string = result.name.replace('{user}','<@'+msg.mentions.members.first().user.id+'>');
                msg.channel.send(finalMsg);
                
            });

        }
        else if(args.length >= 2){
            if(args[0] !== 'add'){
                let m : string = 'To offend someone, use !offense [User]\n';
                m += 'To add an offense: !offense add [offense]\n'
                m += 'You can use {user} as placeholder for Username in offense creation\n'
                msg.channel.send(m);
            } else {
                //Agora bora adicionar
                let ofensa : string = args.slice(1).join(" ")
                let autor : string = msg.author.id;  
                let data : Date = new Date(); //Cria uma nova data com o tempo atual do sistema
                let aprovado : boolean = true;//    MUDAR PRA FALSE DPS -> realmente KKKKKKKKKKKKKKKK
                let obj = new Offense({name: ofensa, creator: autor,
                                         creation: data, approved: aprovado});
                obj.save()
                .then(() =>
                msg.reply('Offense created successfully! Currently waiting approvation from administrator.'));
            }
        }
    }

    readonly name = "offense";
    readonly aliases = ['ofensa'];
    readonly description = "Generate an random offense!";
    readonly enabled = true;
    readonly usage = "/offense";
}
