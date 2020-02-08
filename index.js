const Discord = require('discord.js');
const Bracket = require('./initiative.js');
require('dotenv').config()
const client = new Discord.Client();
const players = new Bracket ([]);
const token = process.env.TOKEN;
const prefix = process.env.PREFIX

client.on('message', (msg) => {

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
        const args = msg.content.slice(prefix.length).split(' ');
        const command = args.shift().toLowerCase();
    if (command === 'roll') {
        let newTotal = 0
        if (!args.length) {
            return msg.channel.send(`What sided dice! How many! ${msg.author}!`);
        }
        for (let i = 0; i < args[1]; i++) 
        {
        let roll = (Math.floor(Math.random() * args[0]) + 1);
        newTotal = newTotal + roll;
        console.log("roll is " + roll)
        console.log("total is " + newTotal)
        }

        msg.channel.send(`${msg.author} has rolled\n Roll: ${newTotal}`);
        console.log(args)
        }
    if (command === 'sayhi') {
        msg.channel.send("hello " + msg.author)
    }

    if (command === "!initiative") {
        msg.channel.send("Roll initiative!")
    }
    if (command === `join`) {
        let exists = false
        console.log("if reached")
        console.log(msg.author.id)
        console.log(players.startingPlayers.length)

        for (let i = 0; i < players.startingPlayers.length + 1; i++) {
            console.log(msg.author.id)
            console.log(players.startingPlayers[i])
            if(`<@${msg.author.id}>` === players.startingPlayers[i])
            {
                console.log("In the fight")
                msg.channel.send(`<@${msg.author.id}> is already in the fight`)
                exists = true
                return exists
            }
        }
        if (!exists){
        console.log(`<@${msg.author.id}> has joined the fight!`)
        players.joinBracket(`<@${msg.author.id}>`);
        msg.channel.send(`<@${msg.author.id}> has joined the fight!`)
        }
            // console.log(`<@${msg.author.id}> has joined the fight!`)
            // players.joinBracket(`<@${msg.author.id}>`);
            // msg.channel.send(`<@${msg.author.id}> has joined the fight!`)
    }

})

client.on('ready', () => {
    console.log("bot is connected")
    // client.channels.find(x => x.name === 'general').send("hello!")
})

client.login(token);