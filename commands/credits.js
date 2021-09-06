const Discord = require("discord.js")
const { MessageAttachment, MessageEmbed } = require(`discord.js`);

const description = {
    name: "credits",
    filename: "credits.js",
    version: "1.0"
      
  };
    
module.exports = {
    name: 'credits',
    description: `credits`,
    
    execute(message, args) {
    message.channel.send(new Discord.MessageEmbed().setTitle(`Credits!`).setDescription(`Contributors 
    - AixX#1217 - Main scripting.
    
    - heli#0001 - Help with certain commands and funcitons.

    `).setFooter(`AixX's Ticket System`))

}}