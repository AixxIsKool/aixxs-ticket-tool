const Discord = require("discord.js")
const description = {
    name: "command",
    filename: "commands.js",
    version: "1.0"
      
  };
    
    console.log(` :: 🟧 Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`)
module.exports = {
    name: 'commands',
    
    execute(message, args) {
        message.delete()
//MessageEmbed variable created

//Let's create Embed Message
//But first, Let's create Variable message 
message.guild.channels.cache.get("871792121269612584").send(new Discord.MessageEmbed().setTitle(`${message.author.tag} has used the help command. Command list has been listed..`).setColor("0549a8"))
message.channel.send(new Discord.MessageEmbed().setTitle("Ticket Bot Commands").setDescription(`**-rename**,
 **-close** (Closes the ticket)
 **-delete** (Deletes the ticket, LAISON+ USE ONLY UNLESS DIRECTED OTHERWISE!)
 **-clear** (Clears 1-100 messages)
 **-transcript** (Sends a Transcript to the  #transcript channel.)
 ` ) .setFooter(`AixX's Ticket System.
All Lefts and Rights reserved`)
 .setColor("03a5fc"));
    }
}