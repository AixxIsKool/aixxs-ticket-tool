const Discord = require("discord.js")

module.exports = {
    name: 'commands',
    
    execute(message, args) {
        
//MessageEmbed variable created

//Let's create Embed Message
//But first, Let's create Variable message 

message.channel.send(new Discord.MessageEmbed().setTitle("Ticket Bot Commands").setDescription(`**-rename**,
 **-close** (Closes the ticket)
 **-delete** (Deletes the ticket, LAISON+ USE ONLY UNLESS DIRECTED OTHERWISE!)
 **-clear** (Clears 1-100 messages)
 ` ) .setFooter(`AixX's Ticket System.
All Lefts and Rights reserved`)
 .setColor("03a5fc"));
    }
}