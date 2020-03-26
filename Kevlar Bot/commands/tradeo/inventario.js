const commando = require('discord.js-commando');
const dbh = require('../../databaseHelper.js');

class inventarioCommand extends commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'inventario',
            group: 'tradeo',
            memberName: 'inventario',
            description: 'Muestra tu inventario'
        });
    }

    async run(message, args) {
		var tableAmount = ['ataqueAmount','defensaAmount','explorarAmount','influenciaAmount','coinsAmount'];
		let db = dbh.openDatabase();
		var total =[];
		let sql = 'SELECT SUM('+tableAmount[0]+') AS a, SUM('+tableAmount[1]+') AS b, SUM('+tableAmount[2]+') AS c, SUM('+tableAmount[3]+') AS d, SUM('+tableAmount[4]+') AS e FROM tcoins WHERE nick = "'+message.author.username+'"' 
		db.get(sql, [], (err, row) => {
				if (err) {
					throw err;
				}
				total[0] = (row.a);
				total[1] = (row.b);
				total[2] = (row.c);
				total[3] = (row.d);
				total[4] = (row.e);
				if (total.includes(null)){
					message.channel.send ('Player no ingresado en el sistema.')
				}
				else (message.reply('En este momento tenes '+total[0]+':crossed_swords: '+total[1]+':shield: '+total[2]+':gear: '+total[3]+':point_up_2: '+total[4]+':moneybag:')
				);
		});				
		dbh.closeDatabase(db);
	}
}

module.exports = inventarioCommand;