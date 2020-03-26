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
    // if (message.content.startsWith(prefix + 'commandname')) {
        //    if (message.author.id !== 'A user ID') return;
            // Your Command Here
        //}
    // var timeturn = 1000 * 60 * 60 * 24    
    // setIinterval (function, miliseconds variable);
    var tableAmount = ['ataqueAmount','defensaAmount','explorarAmount','influenciaAmount','coinsAmount']
    var dado = [4,8,6,20,12];
    var add = [];
    let db = dbh.openDatabase();
    //la variable p es la cantidad de players, deberia estar asociado al gameid
    for (p=1;p<7;p++){
        for (i=0;i<5;i++){
            add[i] = utils.tirarDados(dado[i])
        }
        for (i=0;i<5;i++){
            var query = 'UPDATE tcoins SET ('+tableAmount[i]+') = '+tableAmount[i]+' +'+add[i]+' WHERE userid='+p+''
            db.run(query);
        };
        console.log(add[0],add[1],add[2],add[3],add[4], 'userid =' +p)
    }; 
	dbh.closeDatabase(db);
	
}

// function process orders
// function process resources
// function process pactos
// function process map
module.exports = newturnCommand;