const commando = require('discord.js-commando');

class DadoSampleCommand extends commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'dado',
            group: 'tradeo',
            memberName: 'dadosample',
            description: 'Tira un dado D6'
        });
    }

    async run(message, args) {
        var dado = Math.floor(Math.random() * 6) + 1;
        message.reply("Tiraste un " + dado);
    }
}

module.exports = DadoSampleCommand;