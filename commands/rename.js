const Discord = require("discord.js")

module.exports = {
    name: 'rename',
    description: 'renames a channel!',
    execute(message, args) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:x: You Do Not Have the Permissions to Run That Command!`)

        const name = args.join(" ")

        if (!name) return message.channel.send(`:x: Missing Arguements!`)

        message.channel.setName(name)
        message.channel.send(`Successfully set the name of the channel to: **${name}**`)
    }
}