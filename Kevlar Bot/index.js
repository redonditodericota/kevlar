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

bot.once('ready', () => {
     console.log('Logged in!');
     bot.user.setActivity('kevlar');
});

/////////////////////////////////////////////////////////
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const inventario = sequelize.define('inventario', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	username: Sequelize.STRING,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

bot.once('ready', () => {
    inventario.sync();
});

bot.on('message', async message => {
	if (message.content.startsWith(config.prefix)) {
		const input = message.content.slice(config.prefix.length).split(' ');
		const command = input.shift();
		const commandArgs = input.join(' ');

		if (command === 'addtag') {
			// [delta]
		} else if (command === 'tag') {
			// [epsilon]
		} else if (command === 'edittag') {
			// [zeta]
		} else if (command === 'taginfo') {
			// [theta]
		} else if (command === 'showtags') {
			// [lambda]
		} else if (command === 'removetag') {
			// [mu]
		}
	}
});

////////////////////////////////////////////////////

bot.on('message', (message) => {
    if(message.content == 'juanma'){
        message.channel.send ('altogato');
    }
})

bot.login(config.token); 