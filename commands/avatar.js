const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: "avatar",
    description: "Brodcast someone's avatar",

    async run (client, message, args) {

        let member = message.mentions.users.first() || message.author

        let avatar = member.displayAvatarURL({dynamic: true, size: 1024})


        const embed = new Discord.MessageEmbed()
        .setTitle(`${member.username}'s avatar`)
        .setImage(avatar)
        .setColor("#000000")

        message.channel.send(embed);
    }
}