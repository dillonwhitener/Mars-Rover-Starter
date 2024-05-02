const Message = require("./message");

class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110
    }
    receiveMessage(message){
      let resultReturn = []
      let info = {
         message: message.name, 
         results: resultReturn};

      for (let i = 0; i < message.commands.length; i++) {

      if (message.commands[i].commandType === 'STATUS_CHECK' ){
         resultReturn.push({completed: true, 
            roverStatus: {
            generatorWatts: this.generatorWatts, 
            mode: this.mode,
            position: this.position}});

      }if (message.commands[i].commandType === 'MODE_CHANGE' ){
         resultReturn.push({completed: true});
         this.mode = message.commands[i].value
         
      }if (message.commands[i].commandType === 'MOVE' && this.mode != 'LOW_POWER' ){
         resultReturn.push({completed: true});
         this.position = message.commands[i].value

      }if (message.commands[i].commandType === 'MOVE' && this.mode === 'LOW_POWER' ){
         resultReturn.push({completed: false});
      }

    }
    return info
}
}
module.exports = Rover;