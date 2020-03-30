const commando = require('discord.js-commando');
const dbh = require('../../databaseHelper.js');

class tradeCommand extends commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'trade',
            group: 'tradeo',
            memberName: 'trade',
			description: 'Tradea con otro jugador.',
			args: [
                {
                    key: 'text',
					prompt: 'Ejemplo de trade: k trade (3a+3i)(4d) @nanunanu. En este caso estas buscando cambiar 3 Ataque y 3 Influencia por 4 Defensa con NanuNanu. Acordate de poner entre parentesis cada parte, primero lo que quieras dar y segundo lo que quieras recibir a cambio. Luego menciona a quien esta destinado el trade. Si el trade lo puede agarrar cualquiera menciona a @all o a @todos.',
					type: 'string'
				}
            ]
        });
	}
	
    async run(message, { text }) {

		var db = dbh.openDatabase();
		var user = message.author.username;
		var clean = message.cleanContent;
		
		var returnValues = decodeMsg(clean, text);
		var trade = returnValues[0];
		var canal = returnValues[1];
		var recursosdar = returnValues[2];
		var recursosrecibir = returnValues[3];
		
		var channel = message.guild.channels.find(channel => channel.name === ''+canal+'');
		
		checkPlayerExists(db, user) == user && saveTrade(db, trade, user, canal, recursosdar, recursosrecibir) & sendTrade(user, trade, canal, channel);
		
		dbh.closeDatabase(db);
	
	};

};
	
		
		//Confirmar el trade
		//setTimeout(myFunction, 1000)

		//Si la respuesta es si, 
		//realizar trade y eliminar de la db
		//eliminar trades


module.exports = tradeCommand;

function checkPlayerExists(db, user){
	let sql = ('SELECT nick nick FROM tcoins WHERE nick = ? ORDER BY nick');
	db.each(sql, [user], (err, row) => {
		if (err) {
    	   throw err;
		};
		return row.nick;
	});
};
		
function decodeMsg(clean, text){
		
		if (!clean.includes("@")){
			message.channel.send("El trade tiene que incluir destinatario.");
			return;
		};
		
		let canal;
		if (clean.includes("@all") || clean.includes("@todos")){
			canal = 'general';
		}
		else {canal = clean.split("@")[1].toLowerCase();}
		  
		let trade = text.split("<")[0].toLowerCase();
   		trade = trade.trim();
  		let tradeArray = trade.split("");
  
		let darArranque = tradeArray.indexOf("(");
  		let darFinal = tradeArray.indexOf(")");
  		let dar = tradeArray.splice(darArranque,darFinal+1);
  		dar.pop(); dar.shift();

  		let recibirArranque = tradeArray.indexOf("(");
  		let recibirFinal = tradeArray.indexOf(")");
  		let recibir = tradeArray.splice(recibirArranque,recibirFinal+1);
		recibir.pop(); recibir.shift();
		  
		if (dar.join("") == "" || recibir.join("") == ""){
			message.channel.send ('Fijate que este bien escrito el trade.')
			return;
		};

		console.log(dar.join("")); console.log(recibir.join(""));
		console.log(trade); console.log(canal);

		//Digerir la data para la db
		dar = dar.join("").split('+'); 
		recibir = recibir.join("").split('+');

		console.log(dar);
		console.log(recibir);

		let recursosdar = ['a','d','e','i','c'];		
		dar.forEach((rec)=>{
			let recursoName;
			let recursoAmount;
			let abierto = rec.split("");
			abierto.forEach((item)=>{
				if (isNaN(item)){
					let posicion = abierto.indexOf(item)
					recursoName = abierto[posicion];
					abierto.splice(posicion,1);
					recursoAmount = abierto.join("");
				};
			});
			recursosdar[recursosdar.indexOf(recursoName)] = recursoAmount;
		});
		recursosdar.forEach((r)=>{
			if (isNaN(r)){recursosdar[recursosdar.indexOf(r)]=0};
		});

		let recursosrecibir = ['a','d','e','i','c'];
		recibir.forEach((rec)=>{
			let recursoName;
			let recursoAmount;
			let abierto = rec.split("");
			abierto.forEach((item)=>{
				if (isNaN(item)){
					let posicion = abierto.indexOf(item)
					recursoName = abierto[posicion];
					abierto.splice(posicion,1);
					recursoAmount = abierto.join("");
				};
			});
			recursosrecibir[recursosrecibir.indexOf(recursoName)] = recursoAmount;
		});
		recursosrecibir.forEach((r)=>{
			if (isNaN(r)){recursosrecibir[recursosrecibir.indexOf(r)]=0};
		});

		return [trade, canal, recursosdar, recursosrecibir];
		

};

function saveTrade(db, trade, user, canal, recursosdar, recursosrecibir){

	let sql2 = 'INSERT INTO tmarket (trade,sendnick,receivenick,coinsS,ataqueS,defensaS,explorarS,influenciaS,coinsR,ataqueR,defensaR,explorarR,influenciaR) VALUES ("'+trade+'","'+user+'","'+canal+'","'+recursosdar[4]+'","'+recursosdar[0]+'","'+recursosdar[1]+'","'+recursosdar[2]+'","'+recursosdar[3]+'","'+recursosrecibir[4]+'","'+recursosrecibir[0]+'","'+recursosrecibir[1]+'","'+recursosrecibir[2]+'","'+recursosrecibir[3]+'")'
		db.run(sql2, [], function(err) {
			if (err) {
				throw err;
			}
			console.log('Trade '+trade+' Saved')
		});

		return;
};	

function sendTrade(user, trade, canal, channel){
	if (canal == 'general'){
		channel.send('Trade Abierto: '+trade+'');
	}
	else {channel.send(''+user+' quiere tradear con vos: '+trade+'')};
	return;
};