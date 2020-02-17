const commando = require('discord.js-commando');

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
        var coins = Math.floor(Math.random() * 12) + 1;
        message.channel.send('Bien ' + message.author.username + ' minaste ' + coins + ' coins.');
    }
}

module.exports = minarCommand;