const { Message, Client, MessageAttachment} = require('discord.js')
const fs = require('fs')

module.exports.execute = {
    name : 'close',
    /**
     * @param {Client} client
     * @param {Message} message
     */
    execute : async(client, message) => {
        if(message.channel.parentID !== '852385854952701982') return message.channel.send('You can only use this command in a ticket!');
        const transcriptChannel = message.guild.channels.cache.get('857418255366357022')
        message.channel.send('Deleting ticket in 5 seconds.....')
        setTimeout(() => {
            message.channel.delete().then(async ch=> {
                client.ticketTranscript.findOne({ Channel : ch.id }, async(err, data) => {
                    if(err) throw err;
                    if(data) {
                        fs.writeFileSync(`../${ch.id}.txt`, data.Content.join("\n\n"))
                        transcriptChannel.send(`${message.guild.members.cache.get(ch.name).user.username}'s ticket have been closed.`)
                        await transcriptChannel.send(new MessageAttachment(fs.createReadStream(`../${ch.id}.txt`)));
                        client.ticketTranscript.findOneAndDelete({ Channel : ch.id })
                    }
                })
            })
        }, 5000)
    }
}