const Discord = require('discord.js');

module.exports = {
    name: "myname",

    async run (client, message, args) {
        let member = message.mentions.users.first() || message.author

        const mynameEmbed = new Discord.MessageEmbed()
        .setDescription(`Your name is ${member.username} i think <:h_stare:848210080372359198> `)

        message.channel.send(mynameEmbed);
    }
}