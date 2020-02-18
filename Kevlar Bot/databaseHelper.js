const sqlite3 = require('sqlite3').verbose();
module.exports = {
    openDatabase:function() {
        //la base de datos se guarda en un archivo db/sqlite.db
		return new sqlite3.Database('./db/sqlite.db', (err) => {
			if (err) {
				return console.error(err.message);
			}
			console.log('Connected to SQlite database.');
		});
    },

    closeDatabase(db) {
        db.close((err) => {
			if (err) {
				return console.error(err.message);
			}
			console.log('Close the database connection.');
		});
    }
}
