const commando = require('discord.js-commando');
const path = require('path');
const config = require('./config.json');
const bot = new commando.Client({
    commandPrefix:(config.prefix),
    owner: (config.ownerID),
});

bot.registry.registerDefaultTypes()
    .registerGroups([
        ['tradeo', 'Trade']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

bot.on('ready', () => {
     console.log('Logged in!');
     bot.user.setActivity('game');
});


bot.on('message', (message) => {
    if(message.content == 'juanma'){
        message.channel.send ('altogato');
    }
})

bot.login(config.token); 