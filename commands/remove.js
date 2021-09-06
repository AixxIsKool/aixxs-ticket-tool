const Discord = require("discord.js")
const { MessageAttachment, MessageEmbed } = require(`discord.js`);
const description = {
    name: "remove",
    filename: "remove.js",
    version: "0.01"
  }
  //log that it got loaded on bot start
  console.log(` :: 🔳 Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`)
module.exports = {
    name: 'remove',
    description: `remove's a member from a ticket!`,
    execute(message, args) {
        message.delete()
        let mentions = message.mentions.users.first() || message.mentions.roles.first() 

        message.channel.updateOverwrite(mentions, { SEND_MESSAGES: false, VIEW_CHANNEL: false });
        message.channel.send(new Discord.MessageEmbed().setTitle(`${message.author.tag} has removed a user.`).setDescription(`user has been removed to the ticket.`));
        }
    
}
