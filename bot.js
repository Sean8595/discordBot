require('dotenv').config()
var axios = require('axios')

const Discord = require('discord.js');
const Bracket = require('./initiative.js');
const client = new Discord.Client();
const players = new Bracket([]);
const party = new Bracket([]);
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

client.on('message', (msg) => {

    ////This is the rolling stuff
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    let rolls = []
    if (command === 'roll') {
        console.log(prefix)
        let newTotal = 0
        if (args[1] > 20 || args[0] > 200) {
            return msg.channel.send(`Stop, im not rolling that many die anymore. Keep it less than 20 and at most 200 sided die`);
        }
        else {
            if (!args.length) {
                return msg.channel.send(`What sided dice! How many! ${msg.author}!`);
            }
            for (let i = 0; i < args[1]; i++) {
                let roll = (Math.floor(Math.random() * args[0]) + 1);
                rolls.push(roll)
                console.log(rolls)
                newTotal = newTotal + roll;
            }
            if (args[2] === "+") {
                console.log(args[2])
                // msg.channel.send(`${newTotal} + ${args[3]}`),
                newTotal = newTotal + Number(args[3]);
                msg.channel.send(`${msg.author} has rolled ${rolls}\n ${newTotal} + ${args[3]}\n TotalRoll: ${newTotal}`)
            }
            else {
                args[3] === 0;
                msg.channel.send(`${msg.author} has rolled ${rolls}\n TotalRoll: ${newTotal}`)
                // msg.channel.send(`${msg.author} TotalRoll: ${newTotal}`);
                console.log(args)
            }
        }
    }

    // function Char(playerHp, attack, name) {
    //     this.playerHp = playerHp;
    //     this.attack = attack;
    //     this.name = name;
    //     this.strike = function (victHp) {
    //         var newHp = this.attack - victHp
    //     }
    // }

    //  Adventure Function
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


    //builds party for adventure
    if (command === `adventure`) {
        let exists = false
        console.log(party.adventureParty)

        party.joinAdventure(`<@${msg.author.id}>`);
        msg.channel.send(`<@${msg.author.id}> has joined the fight!`)
        console.log(players.adventureParty)

        // for (let i = 0; i < party.adventureParty.length + 1; i++) {
        //     if (`<@${msg.author.id}>` === party.adventureParty[i]) {
        //         msg.channel.send(`<@${msg.author.id}> is already in the fight`)
        //         exists = true
        //         return exists
        //     }
        // }
        // if (!exists) {
        //     party.joinBracket(`<@${msg.author.id}>`);
        //     msg.channel.send(`<@${msg.author.id}> has joined the fight!`)
        //     console.log(party.adventureParty)
        // }
    }

    //starts adventure
    // if (command === "start") {
    //     msg.channel.send(`You are off on your adventure! Where do you want to go?`)
    //     msg.channel.send(`!town !forest !retire`)
    //     if (command === "town") {

    //     }
    //     else if (command === "forest") {
    //         msg.channel.send(`you have entered the forest`);
    //         msg.channel.send(`You are attacked by a goblin!`);

    //         var playerOne = new Char(10, 5, msg.author);
    //         var playerTwo = new Char(5, 3, "Goblin");

    //         msg.channel.send(`!attack !defend !run`)
    //         if (command === 'attack') {
    //             msg.channel.send(`you swing and attack`)
    //             playerOne.strike(playerTwo.playerHp)
    //         }
    //         else if (command === 'defend') {
    //             msg.channel.send(`you've blocked the attack`)
    //             turn = 'over'
    //         }
    //         else if (command === `run`) {
    //             msg.channel.send(`you've run away`)
    //             turn = 'over'
    //         }

    //     }

    // }



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
            console.log(players.startingPlayers)
            players.joinBracket(`<@${msg.author.id}>`);
            msg.channel.send(`<@${msg.author.id}> has joined the fight!`)
            console.log(players.startingPlayers)
        }
    }


    ////////This is the 5e API work
    if (command === "spell") {

        let rawSpell = msg.content.slice(7);
        let noSpace = rawSpell.replace(/\s/g, '-',)
        let spell = noSpace.toLocaleLowerCase()
        console.log(spell)

        axios.get("https://www.dnd5eapi.co/api/spells/" + spell + "/").then(function (response) {
            console.log(response.data);

            msg.channel.send(response.data.name);

            let comps = response.data.components
            let components = comps.join()

            msg.channel.send(new Discord.RichEmbed()
                .setTitle(response.data.name)
                .setDescription(response.data.desc + "\n" + "################" + '\n' + response.data.higher_level)
                .setFooter(response.data.range + " " + components)
            )
        }).catch(function (error) {
            if (error.response) {
                msg.channel.send("Sorry but i cant find that spell")
            }
        }
        )
    }
    ////Idea for make me a character
    //First it selects a class and race using a rng
    if (command === "newchar") {
        axios.get("https://www.dnd5eapi.co/api/class/").then(function (response) {
            console.log(response.data);
        })}
//Then it rolls stats, 4d6 drop the lowest 5 times and puts them into an array
//then it looks at the class and assigns the two higest numbers to the two most important stats to the character
    //ie if a wizard highest to be int and dex, then it asigns the remainder randomly
//those are assigned and placed into an array
//next part is tricky....
//use the DND 5e API to:
    //Add proficiency bonus based on race
    //provide a background
    //Check what proficiencies and languages a character (based on background, race, and class) can have and assigns them randomly
    //Put in spells again randomly chosen based on how many a class can have
    //Check the amount of hp a character can have at level 1 and it then uses the const modifier (Con - 10 / 2 rounded down) to get the HP
//Use the fake name generator to give a name and average height characteristics to you character (find the csv for the Players Handbook)
})

client.on('ready', () => {
    console.log("bot is connected")
    // client.channels.find(x => x.name === 'general').send("hello!")
})
client.login(token);