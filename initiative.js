class Bracket {
    constructor(players, client, channelName, party) {
      this.client = client;
      this.channelName = channelName;
      this.startingPlayers = players;
      this.adventureParty = party;
      this.bracket = [];
      this.bracketPlayers = [];
      this.currentRoundIdx = 0;
    }
  
    joinBracket(player) {
      if (!this.isStarted) {
        this.startingPlayers.push(player);
        // console.log(player)
      } else {
        this.client.channels.find(x => x.name === this.channelName).send('You cannot join. Match has already started');
      }
    }

    joinAdventure(player) {
        this.adventureParty.push(player);
        console.log(party)
    }
  
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