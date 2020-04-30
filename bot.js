require('dotenv').config()
const Discord = require('discord.js');
const Bracket = require('./initiative.js');
const enterForest = require('./initiative.js');
const enterTown = require('./initiative.js');
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

    function fight(){
        var playerHP = 10;
        var monsterHP = 5;
        var playerAttack = 3;
        var monsterAttack = 1;
        var turn = ''
        msg.channel.send(`!attack !defend !run`)
        if(command === 'attack'){
            msg.channel.send(`you swing and attack`)
            monsterHP - playerAttack == monsterHP;
            turn = 'over'
        }
        else if(command === 'defend'){
            msg.channel.send(`you've blocked the attack`)
            turn = 'over'
        }
        else if (command === `run`){
            msg.channel.send(`you've run away`)
            turn = 'over'
        }
        
    }
    //  Adventure Function
    // var party = []
    // if (command === "adventure")
    // {
    //     if(party.includes(msg.author.username))
    //     {
    //         msg.channel.send(`${msg.author} has already joined the adventure!`)
    //     }
    //     else{
    //     msg.channel.send(`${msg.author} has joined the adventure!`)
    //     }
    // }



    if (command === `adventure`) {
            let exists = false
            for (let i = 0; i < party.adventureParty.length + 1; i++) {
                if (`<@${msg.author.id}>` === party.adventureParty[i]) {
                    msg.channel.send(`<@${msg.author.id}> is already in the fight`)
                    exists = true
                    return exists
                }
            }
            if (!exists) {
                party.joinBracket(`<@${msg.author.id}>`);
                msg.channel.send(`<@${msg.author.id}> has joined the fight!`)
                console.log(party.adventureParty)
            }
        }
        
    
    if (command === "start"){
        msg.channel.send(`You are off on your adventure! Where do you want to go?`)
        msg.channel.send(newChar)
        msg.channel.send(`!town !forest !retire`)
        if(command === "town"){
            
        }
        else if(command === "forest"){
            msg.channel.send(`you have entered the forest`);
            msg.channel.send(`You are attacked by a goblin!`);
            fight();
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