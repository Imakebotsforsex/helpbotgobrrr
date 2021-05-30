const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "ban",

    run: async (client, message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.channel.send(`Sorry but you cannot use that.`)
        }
        if (!args[0]) {
            return message.channel.send(`Mention a user to ban.`)
        }
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        try {
            await member.ban();
            await message.channel.send(`I have successfully slapped ${member} out of the server, i think they died.`)
        } catch (e) {
            return message.channel.send(`This sucks i cannot find the user you stated or they just dont exist.`)
        }

    }
}