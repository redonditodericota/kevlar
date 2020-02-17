const commando = require('discord.js-commando');

class inventarioCommand extends commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'inventario',
            group: 'tradeo',
            memberName: 'inventario',
            description: 'Muestra tu inventario'
        });
    }

    async run(message, args) {
        message.reply('En este momento tenes ' + 'x cantidad de' + ' coins.');
    }
}

module.exports = inventarioCommand;