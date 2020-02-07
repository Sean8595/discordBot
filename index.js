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
    if (command === `${prefix}join`) {
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