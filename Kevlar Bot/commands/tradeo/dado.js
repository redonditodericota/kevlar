const commando = require('discord.js-commando');

class DadoCommand extends commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'dado',
            group: 'tradeo',
            memberName: 'dado',
            description: 'Tira un dado, si no hay parametro es D6'
        });
    }

    async run(message, args) {
		var caras = "";
		for (var i=0; args[i] != undefined; i++){
			caras = caras + args[i];
		}
        var dado = Math.floor(Math.random() * caras) + 1;
		if(Number.isNaN(dado) || caras == "" || caras == null){
			dado = Math.floor(Math.random() * 6) + 1;
			caras = 6;
		}
        message.reply("Tiraste un " + dado + " de un D" + caras);
    }
}

module.exports = DadoCommand;