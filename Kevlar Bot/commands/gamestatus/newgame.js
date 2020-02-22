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
        let db = dbh.openDatabase();
        dbh.resetDatabase();
        console.log('New Game Created');
        dbh.closeDatabase(db);
        message.channel.send(message.author.username + ' creo un nuevo juego');
    }
}

module.exports = newgameCommand;