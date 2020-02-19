const commando = require('discord.js-commando');
const dbh = require('../../databaseHelper.js');

class ordenesCommand extends commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'ordenes',
            group: 'ordenes',
            memberName: 'ordenes',
            description: 'Muestra las ordenes actuales'
        });
    }

    async run(message, args) {
		dbh.leerOrdenes(function(ret){
			message.channel.send(ret);
		})
    }
}

module.exports = ordenesCommand;