//REQUIRES
const commando = require('discord.js-commando');
const path = require('path');
const config = require('./config.json');
const dbh = require('./databaseHelper.js'); 

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
			['tradeo', 'Trade'],
			['gamestatus', 'Game Status']
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
	// https://www.sqlitetutorial.net/sqlite-nodejs/
	let db = dbh.openDatabase();
	
	//los create table se correrian una vez sola para armar la base, no se si a la larga tiene mucho sentido que este metido en el codigo de ejecucion.
	db.run('CREATE TABLE if not exists tcoins (userid integer primary key, amount integer)', [], function(err) {
		if (err) {
			return console.log(err.message);
		}
		console.log(`Table creation ok`);
	});

	dbh.closeDatabase(db);
}


function juanmaFeature(){
	bot.on('message', (message) => {
		if(message.content.toLowerCase().includes('juanma')){
			message.channel.send ('altogato');
		}
	});
}

