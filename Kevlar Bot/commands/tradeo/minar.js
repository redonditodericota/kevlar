const commando = require('discord.js-commando');
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
        if(message.content.toLowerCase().includes('ataque')){
            var caras = (10);
        }
        else {var caras = (1)};

        var add = utils.tirarDados(caras)
        message.channel.send('Bien ' + message.author.username + ' minaste ' + add + ' coins.');
		let db = dbh.openDatabase();
		//TO-DO: buscar el usuario id de discord o playerid y usar eso en vez de -1
		db.run('UPDATE tcoins SET coinsAmount = coinsAmount +'+add+' WHERE userid=-1');
		dbh.closeDatabase(db);
    }
}

module.exports = minarCommand;