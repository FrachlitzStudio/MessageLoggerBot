const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token, logsChannel } = require('./config.json');

client.once('ready', () => {
	console.log('I am alive!');
});

// Messages log
client.on('message', message => {
    // Function
    function isEmpty(collection) {
        for(var arg in collection) {
            if(collection.hasOwnProperty(arg))
                return false;
        }
        return true;
    }
    // Logs
    if(message.author.bot) return;
    let username = message.author.tag;
    let channel = message.channel.name;
    let server = message.channel.guild;
	var serverAvatarURL = message.guild.iconURL;
    var attachment = (message.attachments).array();
    if(isEmpty(attachment)) {
        var img = "";
    } else {
        var img = attachment[0].url;
    }
    let embed_send = new Discord.RichEmbed()
        .setAuthor(username, message.author.avatarURL)
        .setColor('23c115')
        .setTitle("Message sent!")
        .setDescription(message.content + " " + img)
        .setImage(img)
        .setFooter("#" + channel)
        .setTimestamp();
    client.channels.get(logsChannel).send(embed_send);
});

// Message edit log
client.on("messageUpdate", async(oldMessage, newMessage) => {
    // Function
    function isEmpty(collection) {
        for(var arg in collection) {
            if(collection.hasOwnProperty(arg))
                return false;
        }
        return true;
    }
    // Logs
    if (oldMessage.content === newMessage.content) {
        return;
    }

    var attachment = (oldMessage.attachments).array();
    if(isEmpty(attachment)) {
        var img = "";
    } else {
        var img = attachment[0].url;
    }

    let embed_edit = new Discord.RichEmbed()
        .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
        .setColor('2615c1')
		.setTitle("Message edited!")
        .addField("Old", oldMessage.content + " " + img, true)
		.addField("New", newMessage.content + " " + img, true)
        .setFooter("#" + oldMessage.channel.name)
        .setTimestamp();
    client.channels.get(logsChannel).send(embed_edit);
});

// Message delete log
client.on("messageDelete", async message => {
    // Function
    function isEmpty(collection) {
        for(var arg in collection) {
            if(collection.hasOwnProperty(arg))
                return false;
        }
        return true;
    }
    // Logs
    var attachment = (message.attachments).array();
    if(isEmpty(attachment)) {
        var img = "";
    } else {
        var img = attachment[0].url;
    }

    let embed_delete = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setColor('c11515')
    .setTitle("Message deleted!")
    .setDescription(message.content + " " + img)
    .setImage(img)
    .setFooter("#" + message.channel.name)
    .setTimestamp();    
    client.channels.get(logsChannel).send(embed_delete);
});

client.login(token);