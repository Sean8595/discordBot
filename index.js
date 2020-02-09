require('dotenv').config()
const Discord = require('discord.js');
const Bracket = require('./initiative.js');
const client = new Discord.Client();
const players = new Bracket([]);
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

client.on('message', (msg) => {

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    let rolls = []
    if (command === 'roll') {
        let newTotal = 0
        if (!args.length) {
            return msg.channel.send(`What sided dice! How many! ${msg.author}!`);
        }
        for (let i = 0; i < args[1]; i++) 
        {
            let roll = (Math.floor(Math.random() * args[0]) + 1);
            rolls.push(roll)
            console.log(rolls)
            newTotal = newTotal + roll;
            console.log("roll is " + roll)
        }
        if (args[2] === "+")
        {
            // msg.channel.send(`${newTotal} + ${args[3]}`),
            newTotal = newTotal + Number(args[3]);
        }

        msg.channel.send(`${msg.author} has rolled ${rolls}\n ${newTotal} + ${args[3]}\n TotalRoll: ${newTotal}`)
        // msg.channel.send(`${msg.author} TotalRoll: ${newTotal}`);
        console.log(args)
    }
    if (command === 'sayhi') {
        msg.channel.send("hello " + msg.author)
    }

    if (command === "initiative") {
        msg.channel.send("Roll initiative!")
        for (let i = 0; i < players.startingPlayers.length; i++) {
            let initRoll = (Math.floor(Math.random() * 20) + 1);
            msg.channel.send(`${players.startingPlayers[i]} has rolled: ${initRoll}`)
        }
    }
    if (command === `join`) {
        let exists = false
        for (let i = 0; i < players.startingPlayers.length + 1; i++) {
            if (`<@${msg.author.id}>` === players.startingPlayers[i]) {
                msg.channel.send(`<@${msg.author.id}> is already in the fight`)
                exists = true
                return exists
            }
        }
        if (!exists) {
            players.joinBracket(`<@${msg.author.id}>`);
            msg.channel.send(`<@${msg.author.id}> has joined the fight!`)
            console.log(players.startingPlayers)
        }
    }
})

client.on('ready', () => {
    console.log("bot is connected")
    // client.channels.find(x => x.name === 'general').send("hello!")
})
client.login(token);