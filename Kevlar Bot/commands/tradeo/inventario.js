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
		var total;
		let db = dbh.openDatabase();
		let sql = 'SELECT SUM(amount) AS total FROM tcoins WHERE userid = -1'; //TODO: el userid tiene q ser el del usuario de discord
		db.get(sql, [], (err, row) => {
			if (err) {
				throw err;
			}
			total = row.total;
			if (total == null || total == undefined ||total == "") total = 0;
			message.reply('En este momento tenes ' + total + ' coins.');
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