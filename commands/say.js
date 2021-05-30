const { MessageFlags } = require("discord.js");

module.exports = {
    name: "say",
    desciption: "say command",

    async run (client, message, args) {
        let ownerID = '697585433961562182'
        if(message.author.id !== ownerID) return message.channel.send(`Sadly you're not the owner so this command is restricted from you.`);
        let msg;
        let textChannel = message.mentions.channels.first()
        message.delete()

        if(textChannel) {
            msg = args.slice(1).join(" ");
            textChannel.send(msg)
        } else {
            msg = args.join(" ");
            message.channel.send(msg)
        }
    }
}