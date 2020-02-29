require('dotenv').config()
const Discord = require('discord.js');
const Bracket = require('./initiative.js');
const client = new Discord.Client();
const players = new Bracket([]);
const party = new Bracket([]);
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

client.on('message', (msg) => {

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    let rolls = []
    if (command === 'roll') {
        console.log(prefix)
        let newTotal = 0
        // console.log(prefix.length)
        if (!args.length) {
            return msg.channel.send(`What sided dice! How many! ${msg.author}!`);
        }
        for (let i = 0; i < args[1]; i++) 
        {
            let roll = (Math.floor(Math.random() * args[0]) + 1);
            rolls.push(roll)
            console.log(rolls)
            newTotal = newTotal + roll;
        }
        if (args[2] === "+")
        {
            console.log(args[2])
            // msg.channel.send(`${newTotal} + ${args[3]}`),
            newTotal = newTotal + Number(args[3]);
            msg.channel.send(`${msg.author} has rolled ${rolls}\n ${newTotal} + ${args[3]}\n TotalRoll: ${newTotal}`)
        }
        else{
        args[3] === 0;
        msg.channel.send(`${msg.author} has rolled ${rolls}\n TotalRoll: ${newTotal}`)
        // msg.channel.send(`${msg.author} TotalRoll: ${newTotal}`);
        console.log(args)
        }
    }
    //  Adventure Function
    var party = []
    if (command === "adventure")
    {
        if(party.includes(msg.author.username))
        {
            msg.channel.send(`${msg.author} has already joined the adventure!`)
        }
        else{
         var stats = []
        for (let i = 0; i < 4; i++) {
            let statValue = Math.floor((Math.random() * 10) + 1)
            stats.push(statValue)
            console.log(stats)
        }
        var newChar = {name: msg.author.username, str:stats[0], dex:stats[1], int:stats[2], hp:Math.round(10 + stats[0]/2), gp:10}
        party.push(newChar)
        console.log(party)
        msg.channel.send(`${msg.author} has joined the adventure!`)
        }
        return
    }
    if (command === "start" && party.length > 0){
        msg.channel.send(`You are off on your adventure! Where do you want to go?`)
        msg.channel.send(newChar)
        msg.channel.send(`!town !forest !retire`)
        if(command === "town"){
            enterTown();
        }
        else if(command === "forest"){
            enterForest()
        }
        
    }


    // Say Hi Function
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