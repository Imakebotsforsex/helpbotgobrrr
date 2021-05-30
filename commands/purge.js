module.exports = {
    name: "purge",
    description: "purges messages",

    async run (client, message, args) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Sorry but you cannot use that.');

        const amount = args.join(" ");

        if(!amount) return message.reply('Provide an amount of messages i should remove.')

        if(amount > 100) return message.reply(`Sadly you cannot delete more than 100 messages.`)

        if(amount < 1) return message.reply(`Please provide a number above 1.`)

        await message.channel.messages.fetch({limit: amount}).then(messages => {
            message.channel.bulkDelete(messages
    )});


    message.channel.send(`Purged ${amount} message(s). <:h_stare:848210080372359198>`)

    }
}