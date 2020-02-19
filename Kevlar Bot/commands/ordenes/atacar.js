const commando = require('discord.js-commando');
const dbh = require('../../databaseHelper.js');

class AtacarCommand extends commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'atacar',
            group: 'ordenes',
            memberName: 'atacar',
            description: 'Para atacar por ejemplo de A1 a A6, pones !atacar A1 A6'
        });
    }

    async run(message, args) {
		
		const argsArray = args.trim().split(/ +/g);
		var orden = "Atacar de "+argsArray[0].toUpperCase()+" a "+argsArray[1].toUpperCase();
		dbh.guardarOrden(orden);
        message.reply("Orden guardada: "+orden);
    }
}

module.exports = AtacarCommand;