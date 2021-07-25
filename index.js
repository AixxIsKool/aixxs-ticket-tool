const Discord = require('discord.js');
const client = new Discord.Client({partials: ["MESSAGE", "USER", "REACTION"]});
const enmap = require('enmap');
const {token, prefix} = require('./config.json');
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}       
const settings = new enmap({
    name: "settings",
    autoFetch: true,
    cloneLevel: "deep",
    fetchAll: true
});
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'rename'){
        client.commands.get('rename').execute(message, args);
    } 
});
client.on('ready', () => {
    console.log(client.user.username + " has logged in.");
});
// Bot Chatter
let y = process.openStdin()
    y.addListener("data", res => {
        let x = res.toString().trim()
        client.channels.cache.get('867530245522980904').send(x);
});
module.exports = {
    name: 'rename',
    description: 'renames a channel!',
    execute(message, args) {
        if(!message.member.hasRole("MANAGE_ROLES")) return message.channel.send(`:x: You Do Not Have the Permissions to Run That Command!`)
 
        const name = args.join(" ")
 
        if (!name) return message.channel.send(`:x: Missing Arguements!`)
 
        message.channel.setName(name)
        message.channel.send(`Successfully set the name of the channel to **${name}**`)
    }
}

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
        if(!message.channel.name.includes("ticket-")) return message.channel.send("You cannot use that here!")
        for (let i = 1; i <= 5; i++) {
            setTimeout(() => console.log(`#${i}`), 5000);
          }
        message.channel.delete();
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
                }
            ],
            
        }).then(async channel => {
            channel.send(`<@${user.id}> Welcome! Our Support Team Will be with you shortly!`, new Discord.MessageEmbed().setTitle("Welcome to your ticket!").setDescription("We will be with you shortly").setColor("03a5fc"))
        })
    }
});

client.login(token);