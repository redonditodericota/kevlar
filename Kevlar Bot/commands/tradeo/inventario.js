const commando = require('discord.js-commando');
const sqlite3 = require('sqlite3');
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
		let sql = 'SELECT SUM('+tableAmount[0]+') AS a, SUM('+tableAmount[1]+') AS b, SUM('+tableAmount[2]+') AS c, SUM('+tableAmount[3]+') AS d, SUM('+tableAmount[4]+') AS e FROM tcoins WHERE userid = 0' //TO-DO: el userid tiene q ser el del usuario de discord 
		db.get(sql, [], (err, row) => {
				if (err) {
					throw err;
				}
				total[0] = (row.a);
				total[1] = (row.b);
				total[2] = (row.c);
				total[3] = (row.d);
				total[4] = (row.e);
				for (var i=0;i<5;i++){
					if (total[i] == null || total[i] == undefined || total[i] == "") total[i] = 0;
				};
				message.reply('En este momento tenes '+total[0]+':crossed_swords: '+total[1]+':shield: '+total[2]+':gear: '+total[3]+':point_up_2: '+total[4]+':moneybag:');
			});
						
		/*db.all('select * from tcoins', [], (err, rows) => {
			 rows.forEach((row) => {
				console.log(row.userid +' '+ row.amount);
			  });
		})*/
		dbh.closeDatabase(db);
	}
}

module.exports = inventarioCommand;