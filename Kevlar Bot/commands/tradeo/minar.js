const commando = require('discord.js-commando');
const dbh = require('../../databaseHelper.js');
const utils = require('../../utils.js');

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
        var recurso = ['ataque','defensa','explorar','influencia','coins'];
        var dado = [4,8,6,20,12];
        var i=0;
        var caras;
        while (i<5){
            if(message.content.toLowerCase().includes(recurso[i])){
            var caras = dado[i];
            break;
            }
            i++;
        }
        if (caras == null || caras == undefined){
            message.channel.send('Indicar recurso (ataque, defensa, explorar, influencia o coins) ej: k minar ataque');
            return;
        }
        var tableAmount = ['ataqueAmount','defensaAmount','explorarAmount','influenciaAmount','coinsAmount']
        var add = utils.tirarDados(caras)
        message.channel.send('Bien ' + message.author.username + ' minaste ' + add + ' coins.');
		let db = dbh.openDatabase();
        //TO-DO: buscar el usuario id de discord o playerid y usar eso en vez de -1
        var query = 'UPDATE tcoins SET '+tableAmount[i]+' = '+tableAmount[i]+' +'+add+' WHERE userid=-1'
        console.log(query)
        db.run(query);
		dbh.closeDatabase(db);
    }
}

module.exports = minarCommand;