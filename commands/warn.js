const Discord = require("discord.js")
const description = {
    name: "warn",
    filename: "warn.js",
    version: "1.0"
      
  };
    
module.exports = {
    name: 'warn',
    description: `Warns a member to a ticket!`,
    
    execute(message, args) {
        if (command === "warn") {
           
            let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You can't use that command!")
            if (!dUser) return message.channel.send("Can't find user!")
            let dMessage = args.join(" ").slice(22);
            if (dMessage.length < 1) return message.reply('what is the reason???')
        
            dUser.send(`${dUser}, You have been warned for doing ${dMessage} in the server ${message.guild.name}`)
        
            message.channel.send(`${dUser} has been warned for doing ${dMessage} :thumbsdown:`)
            message.guild.channels.cache.get("871792121269612584").send(new MessageEmbed().setTitle(`${message.author.tag} has used the warn command. ${message.mentions.user}.`).setColor("327da8"))
    }
    }}
    console.log(` :: 🟨 Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`)