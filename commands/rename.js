const Discord = require("discord.js")
const client = new Discord.Client
const description = {
    name: "rename",
    filename: "rename.js",
    version: "1.2"
      
  };
    
    console.log(` :: ⏹  Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`)
module.exports = {
    name: 'rename',
    description: 'renames a channel!',
    
    execute(message, args) {
        message.delete();
        if(!message.channel.name.includes("ticket-")) return message.channel.send("You cannot use that here!")
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`:x: You Do Not Have the Permissions to Run That Command!`)
        const name = args.join(" ")
        
        if (!name) return message.channel.send(`:x: Missing Arguements!`)
        
        message.channel.setName(`ticket-${name}`)
        message.channel.send(`Successfully set the name of the channel to: **${name}**`)
        message.delete();
        message.guild.channels.cache.get("871792121269612584").send(new Discord.MessageEmbed().setTitle(`${message.author.tag} has used the rename command. Channel has been renamed to ***${name}***`).setColor("03a5fc"))

        
          
    }
}