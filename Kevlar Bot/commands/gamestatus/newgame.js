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
        let id = -1;
        db.run(`DELETE FROM tcoins WHERE rowid=?`, id, function(err) {
            if (err) {
             return console.error(err.message)
            }
            console.log(`Row(s) deleted ${this.changes}`);
        });
        console.log('New Game Created');
        dbh.closeDatabase(db);
        message.channel.send(message.author.username + ' creo un nuevo juego');
    }
}

module.exports = newgameCommand;