const commando = require('discord.js-commando');
const path = require('path');
const bot = new commando.Client({
    commandPrefix:'kev',
    owner: '539148241279778829',
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

bot.login('Njc4NTkxOTQxODg5MjI4ODIx.XklGBQ.XsizqR4VMboE5IkOJEO-BkxKyCc');