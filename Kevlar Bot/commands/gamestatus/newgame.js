const commando = require('discord.js-commando');
const dbh = require('../../databaseHelper.js');




class newgameCommand extends commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'newgame',
            group: 'gamestatus',
            memberName: 'newgame',
            description: 'Limpia la database y genera una nueva'
        });
    }

    async run(message, args) {
       // if (message.content.startsWith(prefix + 'commandname')) {
        //    if (message.author.id !== 'A user ID') return;
            // Your Command Here
        //}
        let db = dbh.openDatabase();
        dbh.resetDatabase();
        console.log('New Game Created');
        message.channel.send(message.author.username + ' creo un nuevo juego');
        message.channel.send('Para ingresar al juego enviar comando "newplayer"')
        dbh.closeDatabase(db);
        //class gameConfig = [
        //    mod: '',
        //    gameId:'',
        //    turn: '',
        //];
    }
};


module.exports = newgameCommand