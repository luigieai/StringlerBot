import { Client, Message, MessageEmbed, RichEmbed, Guild, GuildChannel, Channel, TextChannel } from "discord.js";
import EventBase from "../EventBase";
import Module from "../Module";
import CommandBase from "../CommandBase";
import DiscordHandler from "../../DiscordHandler";
import ConfigBot from '../../models/ConfigBot';

export default class AntiDelete extends Module implements EventBase {
    readonly name: string = 'AntiDelete';
    readonly shortDescription: string = 'Proibe a exclusão de mensagens';
    readonly description: string = 'Toda vez que alguém deleta uma mensagem em um canal de texto, o módulo manda uma mensagem no canal "caguetando" quem excluiu a mensagem e qual a mensagem';

    constructor(dsClient: Client) {
        super(dsClient);
        this.addCommand(this.command);
    }

    //Achar a configuração do canal pelo banco de dados
    static async getLogID(guild : Guild) : Promise<GuildChannel>{
        let res = await ConfigBot.findOne({
            where: {serverId: guild.id,
                    name: 'antidelete_channelId'}, 
        });
        if(!res){
            return null;
        }
        return guild.channels.get(res.value);
    }
    //Insere uma configuração
    static async setLogID(guild: Guild, channelId: string){
        //Define os valores a serem criados / atualizados
        let values = {
            name : 'antidelete_channelId',
            value : channelId,
            serverId : guild.id
        }
        //O método upsert já faz toda a lógica de identificar se um registro com as condições já existem, se existir ele atualiza
        //Senão ele apenas cria
        return await ConfigBot.upsert(values);
    }

    handleEvent(): void {
        this.dsClient.on("messageDelete", async (msg : Message) => {
            if(!msg.guild) return;
            if(msg.author.bot) return;
            if(!msg.content) return;
            const att = msg.attachments.first();
            
            let nickname = msg.guild.member(msg.author).displayName || msg.author.username;

            const embed = new RichEmbed().setTitle('Mensagem excluida - ' + msg.guild.channels.get(msg.channel.id).name)
                .setColor(0x824aee)
                .setAuthor(`${msg.author.tag} (${nickname})`, msg.author.displayAvatarURL)
                .addField('Mensagem', `${msg.content.substring(0, 1020)}`)
            if(att) embed.addField('Anexos', att.url);
            embed.setTimestamp();
            embed.setFooter('Mensagem deletada');

            msg.channel.send(embed);
            //Se tem uma mensagem de logs definida
            let channelLog = await AntiDelete.getLogID(msg.guild) as TextChannel;
            if(channelLog){
                channelLog.send(embed);
            }
           });
    }


    private command : CommandBase = {
        name : 'antidelete',
        description : 'Comando para configurar o módulo AntiDelete',
        aliases : [],
        enabled : true,
        run : this.run,
    }

    private async run(client: Client, msg: Message, args: any[]){
        let formt : string = `${DiscordHandler.prefix}${this.name}`;
        if(args.length == 0){
            let reply = `Utilize "${formt} setlog" para definir o canal atual para ser responsável pelas logs do módulo`;
            msg.reply(reply);
        }
        else if(args.length ==1){
            if(args[0] === 'setlog'){
                let currentChannel : string = msg.channel.id;
                let currentGuild : Guild = msg.guild;
                //inserimos a atualização
                let insert = await AntiDelete.setLogID(currentGuild, currentChannel);
                if(insert){
                    msg.reply('Canal atualizado com sucesso!');
                } else { //se deu erro
                    msg.reply('Ocorreu um erro');
                }
            }
        }
    }
    
}
