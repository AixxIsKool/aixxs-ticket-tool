const Discord = require("discord.js")
const { MessageAttachment, MessageEmbed } = require(`discord.js`);
const description = {
    name: "add",
    filename: "add.js",
    version: "0.01"
  }
  //log that it got loaded on bot start
  console.log(` :: ⬛ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`)
module.exports = {
    name: 'add',
    description: `Adds a member to a ticket!`,
    execute(message, args) {
        message.delete()
        
        let mentions = message.mentions.users.first() || message.mentions.roles.first()

        message.channel.updateOverwrite(mentions, { SEND_MESSAGES: true, VIEW_CHANNEL: true });
        message.channel.send(new Discord.MessageEmbed().setTitle(`${message.author.tag} has added user.`).setDescription(`user has been added to the ticket.`));
        }
    
}
