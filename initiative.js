class Bracket {
    constructor(players, client, channelName, party) {
      this.client = client;
      this.channelName = channelName;
      this.startingPlayers = players;
      this.startingParty = party;
      // this.bracket = [];
      // this.bracketPlayers = [];
      // this.currentRoundIdx = 0;
    }
  
    joinBracket(player) {
      if (!this.isStarted) {
        console.log(player)
        this.startingPlayers.push(player);
        console.log(player)
      } else {
        this.client.channels.find(x => x.name === this.channelName).send('You cannot join. Match has already started');
      }
    }
    joinAdventure(partyPeople) {
        this.startingParty.push(partyPeople);
        console.log(partyPeople)
    }
    enterTown(){
      try{
      msg.channel.send(`Welcome to Town!`)
      msg.channel.send(`!shop, !rest, !leave`)
      }
      catch(err){
        "issue is" + err
      }
    }
    // enterForest(){
    //   let encounter = Math.floor((Math.random() * 3) + 1)
    //   if(encounter = 1){
    //     msg.channel.send(`You've been attacked by goblins! What will you do?`)
    //     msg.channel.send(`!fight !flee !trick`)
    //   }
    // }
    // fightFunction(str,int){
    //   enemyStat = Math.floor((Math.random() * 10) + 1)
    //   if(str >= enemyStat){
    //     const reward = Math.floor((Math.random() * 10) + 1)
    //     msg.channel.send(`You found ${reward} gold!`)
    //   }
    //   else{
    //     msg.channel.send(`You've been defeated :(`)
    //   }
    // }


    ////////////////////////Extra 
    checkRoundEnd() {
      let isCompleted = true;
      this.bracket[this.currentRoundIdx].forEach(({ completed }) => {
        if (!completed) {
          isCompleted = false;
        }
      });
  
      return isCompleted;
    }
  
    createMatch(opponents) {
      const byeIndex = opponents.indexOf('BYE');
      const hasBye = byeIndex !== -1;
      return {
        player1: { name: opponents[0], winner: hasBye && byeIndex !== 0 ? true : false },
        player2: { name: opponents[1], winner: hasBye && byeIndex !== 1 ? true : false },
        completed: hasBye ? true : false,
      };
    }
  }
  
  module.exports = Bracket;