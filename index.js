const Discord = require('discord.js');
const token = "Njc0NjQxNTE5NDQ5NDczMDI2.XjrjMw.6vjHtcs1BJ-6tPPfDPDrhzVlsY4";
const Bracket = require('./initiative.js');
const client = new Discord.Client();
const players = new Bracket ([""])


client.on('message', (msg) => {
    console.log(msg)



    if (msg.content === "!sayhi") {
        msg.channel.send("hello " + msg.author)
    }

    if (msg.content === "!roll") {
        rolled = (msg.author + " rolled a " + (Math.floor(Math.random() * 20) + 1));
        msg.channel.send(rolled)
    }

    if (msg.content === "!initiative") {
        msg.channel.send("Roll initiative!")
    }
    if (msg.content === "!join") {
        console.log(`<@${msg.author.id}> has joined the fight!`)
        players.joinBracket(`<@${msg.author.id}>`);
        msg.channel.send(`<@${msg.author.id}> has joined the fight!`)
        console.log(players)
    }

})

client.on('ready', () => {
    console.log("bot is connected")
    // client.channels.find(x => x.name === 'general').send("hello!")
})

client.login(token);