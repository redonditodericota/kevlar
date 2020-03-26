const commando = require('discord.js-commando');
const dbh = require('../../databaseHelper.js');

class newplayerCommand extends commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'newplayer',
            group: 'gamestatus',
            memberName: 'newplayer',
            description: 'Genera nuevo player'
        });
    }

    async run(message, args) {
        let sql = ('SELECT DISTINCT nick nick FROM tcoins ORDER BY nick')
        let db = dbh.openDatabase();
        var players =[];
        var check = 0;
	    db.all(sql, [], (err, rows) => {
		    if (err) {
    		    throw err;
              }
            var i = 0;
            rows.forEach((row) => {
                if (row.nick === message.author.username){
                    message.channel.send ('Usuario '+message.author.username+' ya esta ingresado en el sistema.')
                    check++;
                };
                if (row.nick.includes('player')){
                    players[i++] = row.nick;
                    check++;
                };                
            });
            if (players.length == check && players.length>0){
                console.log(players);
                console.log(check);
                var query = 'UPDATE tcoins SET nick = "'+message.author.username+'" WHERE userid='+check+''                
                console.log(query);
                db.run(query);
                message.channel.send ('Player '+message.author.username+' ingresado.');
                message.guild.createChannel(message.author.username, { 
                    type: "text",
                    permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL'],
                    },
                    {
                        id: message.author.id,
                        allow: ['VIEW_CHANNEL'],
                    },
                    ], 
                })
            }
            if (players.length == 0 && check !== 1){message.channel.send ('Players esta completo.')};
        });
	    dbh.closeDatabase(db);
    }
}

module.exports = newplayerCommand