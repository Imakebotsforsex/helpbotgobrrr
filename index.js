const Discord = require('discord.js');
const { token, dprefix } = require('./config.json');
const { readdirSync } = require('fs');
const db = require('quick.db');
const { join } = require('path');
const config = require('./config.json');
const client = new Discord.Client();
client.config = config;

client.aliases = new Discord.Collection();
client.commands = new Discord.Collection();

client.on('guildMemberAdd', async (member) => {
    client.channels.cache.get('848460388856365066').setName(`☁・Current: ${member.guild.memberCount}`)
})

client.on('guildMemberRemove', async (member) => {
    client.channels.cache.get('848460388856365066').setName(`☁・Current: ${member.guild.memberCount}`)
})

const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));


for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`${client.users.cache.size} members in help`, { type: "WATCHING"})
})

client.on("message", async message => {

    if(message.author.bot) return

    if(db.has(`afk-${message.author.id}+${message.guild.id}`)) {
        const info = db.get(`afk-${message.author.id}+${message.guild.id}`)
        await db.delete(`afk-${message.author.id}+${message.guild.id}`)
        message.reply(`Your AFK status was removed for talking. (${info})`)
    }
    //checking for mentions
    if(message.mentions.members.first()) {
        if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
            message.channel.send(message.mentions.members.first().user.tag + ":" + db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`))
        }else return;
    }else;
    
    if(message.channel.type === 'dm') return;

    let prefix = await db.get(`prefix_${message.guild.id}`);
    if(prefix === null) prefix = dprefix;


    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})



client.login(token);