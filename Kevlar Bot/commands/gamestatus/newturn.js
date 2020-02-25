const commando = require('discord.js-commando');
const dbh = require('../../databaseHelper.js');
const utils = require('../../utils.js');

class newturnCommand extends commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'newturn',
            group: 'gamestatus',
            memberName: 'newturn',
            description: 'Renueva recursos, actualiza mapa y manda notificaciones.'
        });
    }

    async run(message, args) {
        let db = dbh.openDatabase();
        adjudicarRecursos();
        console.log('New Turn Adjudicado');
        dbh.closeDatabase(db);
        message.channel.send(message.author.username + ' adjudico turno.');
    }
}

function adjudicarRecursos(){
    var tableAmount = ['ataqueAmount','defensaAmount','explorarAmount','influenciaAmount','coinsAmount']
    var dado = [4,8,6,20,12];
    var add = [];
    for (i=0;i<5;i++){
        add[i] = utils.tirarDados(dado[i])
    }
    console.log(add[0],add[1],add[2],add[3],add[4])
	let db = dbh.openDatabase();
        //TO-DO: buscar el usuario id de discord o playerid y usar eso en vez de 0
    for (i=0;i<5;i++){
        var query = 'UPDATE tcoins SET ('+tableAmount[i]+') = '+tableAmount[i]+' +'+add[i]+' WHERE userid=0'
        db.run(query);
        console.log(query)
    };
	dbh.closeDatabase(db);
	
}
module.exports = newturnCommand;