import { Client, Message, MessageEmbed, RichEmbed } from "discord.js";
import EventBase from "../EventBase";

export default class AntiDelete implements EventBase {

    readonly dsClient : Client;

    constructor(dsClient: Client) {
        this.dsClient = dsClient;
    }

    handleEvent(): void {
        this.dsClient.on("messageDelete", (msg : Message) => {
            if(!msg.guild) return;
            if(msg.author.bot) return;
            if(!msg.content) return;
            const att = msg.attachments.first();
            
            let nickname = msg.guild.member(msg.author).displayName || msg.author.username;

            const embed = new RichEmbed().setTitle('Mensagem excluida')
                .setColor(0x824aee)
                .setAuthor(`${msg.author.tag} (${nickname})`, msg.author.displayAvatarURL)
                .addField('Mensagem', `${msg.content.substring(0, 1020)}`)
            if(att) embed.addField('Anexos', att.url);
            embed.setTimestamp();
            embed.setFooter('Mensagem deletada');

            msg.channel.send(embed);
            
           });
    }

}
