const commando = require('discord.js-commando');
const utils = require('../../utils.js');

class DadoCommand extends commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'dado',
            group: 'tradeo',
            memberName: 'dado',
            description: 'Ejemplos: para tirar 1d6: !dado · para tirar 1d4: !dado 4 · para tirar 3d8: !dado 8 3'
        });
    }

    async run(message, args) {
		var caras = 6;
		var cantidad = 1;
		const argsArray = args.trim().split(/ +/g);
		if (Number.isInteger(Number.parseInt(argsArray[0]))) caras = argsArray[0];
		if (Number.isInteger(Number.parseInt(argsArray[1]))) cantidad = argsArray[1];
        message.reply("Tiraste " + utils.tirarDados(caras,cantidad) + " de "+cantidad+"D" + caras);
    }
}

module.exports = DadoCommand;
