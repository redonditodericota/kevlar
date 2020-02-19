const commando = require('discord.js-commando');
const sqlite3 = require('sqlite3');
const dbh = require('../../databaseHelper.js');
const utils = require('../../utils.js');

class minarCommand extends commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'minar',
            group: 'tradeo',
            memberName: 'minar',
            description: 'Mina un D12 de coins :star_struck:'
        });
    }

    async run(message, args) {
        var coins = utils.tirarDados(12)
        message.channel.send('Bien ' + message.author.username + ' minaste ' + coins + ' coins.');
		let db = dbh.openDatabase();
		//TO-DO: buscar el usuario id de discord o playerid y usar eso en vez de -1
		db.run('UPDATE tcoins SET amount = amount + '+coins+' WHERE userid=-1');
		dbh.closeDatabase(db);
    }
}

module.exports = minarCommand;