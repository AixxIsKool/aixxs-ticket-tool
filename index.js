const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const enmap = require('enmap');
const {token, prefix} = require('./config.json');
const fs = require('fs');
const { MessageEmbed } = require('discord.js');




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
// Command Handler
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 

    if(command === 'rename'){
        client.commands.get('rename').execute(message, args);
     } else if(command === 'close')
        client.commands.get('close').execute(message, args); 
        else if(command === 'commands')
        client.commands.get('commands').execute(message, args);
        else if(command === 'warn')
        client.commands.get('warn').execute(message, args);
        else if(command === 'ticket')
        client.commands.get('ticket').execute(message, args);
        else if(command === 'add')
        client.commands.get('add').execute(message, args);
        else if(command === 'remove')
        client.commands.get('remove').execute(message, args);
        else if(command === 'credits')
        client.commands.get('credits').execute(message, args);
        
       
});
client.on("message", message => {
    if(message.member.hasPermission(['ADMINISTRATOR']))
    if (message.content.toLowerCase() == "shutdown") { // Note that this is an example and anyone can use this command.
        message.channel.send("Shutting down...").then(() => {
            client.destroy();
        })
    }
})

 





// Console / Going Online
const activities_list = [
    "Castle Designs has been rebranded to Nordic Designs. discord.gg/MqRPPWF",
    `"Our main focus is our customers happiness. We wish to see others enjoying the products made here at Nordic Development!" - Nordic |    discord.gg/MqRPPWF  `,
    "Baking a cake... wait I can't do that. 😟",
    "Make sure to read the rules! discord.gg/MqRPPWF"
]; // creates an arraylist containing phrases you want your bot to switch through.


client.on('ready', () => {
    setInterval(() => {
        
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index], { type: 'WATCHING' }); // sets bot's activities to one of the phrases in the arraylist.
    }, 5000); // Runs this every 10 seconds.
    console.log(` :: 🟪 Module: report | Loaded version v1.0 from ("report.js")`);
    console.log(` :: 🟫 Module: clear | Loaded version v1.0 from ("clear.js")`);
    console.log(` :: 🟦 Module: ticket-log | Loaded version v1.0 from ("ticket-log.js")`);
    console.log(client.user.username + " has logged in. 🟥");
    console.log(client.user.username + " has loaded commands. 🟨")
    console.log(client.user.username + " is ready. 🟩")
    
    const channel = client.channels.cache.get("880319273459933215");
    if (!channel) return console.error("The channel does not exist!");
    channel.join().then(connection => {
      // Yay, it worked!
      console.log(`Successfully connected to ${channel.name} VC. 🎤`);
    }).catch(e => {
      // Oh no, it errored! Let's log it to console :)
      console.error(e);
    });
  });
  




// Voice Chat


// Clear Command
client.on('message', async (message) => {
    if (
      message.content.toLowerCase().startsWith(prefix + 'clear') ||
      message.content.toLowerCase().startsWith(prefix + 'c ')
    ) {
      if (!message.member.hasPermission('MANAGE_MESSAGES'))
        return message.channel.send("You cant use this command since you're missing `manage_messages` perm");
      if (!isNaN(message.content.split(' ')[1])) {
        let amount = 0;
        if (message.content.split(' ')[1] === '1' || message.content.split(' ')[1] === '0') {
          amount = 1;
        } else {
          amount = message.content.split(' ')[1];
          if (amount > 100) {
            amount = 100;
          }
        }
        await message.channel.bulkDelete(amount, true).then((_message) => {
          message.channel.send(`Bot cleared \`${_message.size}\` messages :broom:`).then((sent) => {
            setTimeout(function () {
              sent.delete();
            }, 2500);
          });
        });
      } else {
        message.channel.send('enter the amount of messages that you would like to clear').then((sent) => {
          setTimeout(function () {
            sent.delete();
          }, 2500);
        });
      }
    } else {
      if (message.content.toLowerCase() === prefix + 'help clear') {
        const newEmbed = new Discord.MessageEmbed().setColor('#00B2B2').setTitle('**Clear Help**');
        newEmbed
          .setDescription('This command clears messages for example `.clear 5` or `.c 5`.')
          .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
          .setTimestamp();
        message.channel.send(newEmbed);
        
      }
      
    }
  });
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
        message.channel.send(new Discord.MessageEmbed().setTitle(`Ticket is being deleted in **5 Seconds** by ${message.author.tag}.`).setColor("03a5fc")),
        setTimeout(function(){ 
            message.channel.delete()
         }, 5000);
         message.guild.channels.cache.get("871792121269612584").send(new Discord.MessageEmbed().setTitle(`${message.author.tag} has used the delete command. ${message.channel.name} has been deleted.`).setColor("ff0400"))
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
               


            ],
            
        }).then(async channel => {
            channel.send(`<@${user.id}> Welcome! Our Support Team Will be with you shortly!`, new Discord.MessageEmbed().setTitle("Welcome to your ticket!").setDescription("We will be with you shortly").setColor("03a5fc"))
            
            
            
            
            
        })
        
    }
    
});


//load the transcript module
const transcript = require("./transcript")
transcript(client, "-transcript", 500)  
//transcript(client, "CMD", "MAXIMUM msgs") //minimum = 100 




client.login(token);