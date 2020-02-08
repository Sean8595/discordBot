class Bracket {
    constructor(players, client, channelName) {
      this.client = client;
      this.channelName = channelName;
      this.startingPlayers = players;
    }
  
    joinBracket(player) {
      if (!this.isStarted) {
        this.startingPlayers.push(player);
        // console.log(player)
      } else {
        this.client.channels.find(x => x.name === this.channelName).send('You cannot join. Match has already started');
      }
    }
  }
  
  module.exports = Bracket;