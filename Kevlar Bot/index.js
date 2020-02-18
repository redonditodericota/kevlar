//REQUIRES
const commando = require('discord.js-commando');
const path = require('path');
const config = require('./config.json');
const sqlite3 = require('sqlite3').verbose();


//CORE

const bot = initializeBot();

initializeCoinsDatabase();

juanmaFeature();

bot.login(config.token); 


//FUNCIONES:

function initializeBot(){
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
	return bot
}

function initializeCoinsDatabase(){
	
}

function juanmaFeature(){
	bot.on('message', (message) => {
		if(message.content.toLowerCase().includes('juanma')){
			message.channel.send ('altogato');
		}
	});
}