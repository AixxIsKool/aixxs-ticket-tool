const Discord = require("discord.js")
const description = {
    name: "ticket",
    filename: "ticket.js",
    version: "1.0"
      
  };
    
module.exports = {
    name: 'ticket',
    description: `Warns a member to a ticket!`,
    
    execute(message, args) {
client.on('message', async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command == "ticket-setup") {
        // ticket-setup #channel

        let channel = message.mentions.channels.first();
        if(!channel) return message.reply("Usage: `!ticket-setup #channel`");

        let sent = await channel.send(new Discord.MessageEmbed()
            .setTitle("Ticket System")
            .setDescription("React to open a ticket! The ticket system is used for questions/applications/concerns that you may have. Please open a ticket and one of our Support Team member's will be with you as soon as they can. (Please Note: Our Support Team Members have lives to, so expect a possible delay with your ticket response. Please do not Ping/Mention anyone for questions. They will get to your as a soon as possible. If it has been over 48 hours, then you're aloud to DM **one** Support Team Member to assist you. We thank you for your patience!:) )")
            .setFooter("Ticket System")
            .setColor("03a5fc")
        );

        sent.react('🎫');
        settings.set(`${message.guild.id}-ticket`, sent.id);

        message.channel.send("Ticket System Setup Done!")
    }
    
    if(command == "delete") {
        if(!message.member.hasPermission("MANAGE_MESSAGES"));
         if(!message.channel.name.includes("ticket-")) return message.channel.send("You cannot use that here!")
        message.channel.send(new Discord.MessageEmbed().SetTitle(`Ticket is being deleted in **5 Seconds** by ${message.author.tag}.`).setColor("03a5fc")),
        setTimeout(function(){ 
            message.channel.delete()
         }, 5000);
         message.guild.channels.cache.get("871792121269612584").send(new Discord.MessageEmbed().setTitle(`${message.author.tag} has used the delete command. Channel has been deleted.`).setColor("ff0400"))
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    if(user.partial) await user.fetch();
    if(reaction.partial) await reaction.fetch();
    if(reaction.message.partial) await reaction.message.fetch();

    if(user.bot) return;

    let ticketid = await settings.get(`${reaction.message.guild.id}-ticket`);

    if(!ticketid) return;

    if(reaction.message.id == ticketid && reaction.emoji.name == '🎫') {
        reaction.users.remove(user);

        reaction.message.guild.channels.create(`ticket-${user.username}`,  {
            type: 'text',
            parent : '852385854952701982',
            permissionOverwrites: [
                {
                    id: user.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                },
                {
                    id: reaction.message.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"]
                },
                {
                    id: ("849503393806549033"),
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                },
               reaction.guild.channels.cache.get("871792121269612584").send(new MessageEmbed().setTitle(`${reaction.message.guild.id} has made a ticket.`).setColor("327da8"))

            ],
            
        }).then(async channel => {
            channel.send(`<@${user.id}> Welcome! Our Support Team Will be with you shortly!`, new Discord.MessageEmbed().setTitle("Welcome to your ticket!").setDescription("We will be with you shortly").setColor("03a5fc"))
            channel.send(`Welcome!`)
            
            
            
            
        })
    }
})}};