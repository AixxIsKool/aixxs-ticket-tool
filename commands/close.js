const Discord = require("discord.js")
const description = {
    name: "close",
    filename: "close.js",
    version: "1.0"
      
  };
    
    console.log(` :: 🟥 Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`)
module.exports = {
    name: 'close',
    description: 'Closes a channel!',
    
    execute(message, args) {
        message.channel.setParent("856969398577266729")
        message.channel.send(new Discord.MessageEmbed().setTitle(`Ticket has been closed by ${message.author.tag}.`).setColor("03a5fc"))
        let number = (0, 9999);
        message.channel.setName(`closed-ticket-${number}`)
        message.guild.channels.cache.get("871792121269612584").send(new Discord.MessageEmbed().setTitle(`${message.author.tag} has used the close command. Channel has been closed.`).setColor("ded9d9"))
        
       
    }
    
}
