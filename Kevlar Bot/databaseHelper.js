// https://www.sqlitetutorial.net/sqlite-nodejs/

///TO-DO: Todo lo que es base de datos se tiene q encargar este archivo y proveer funciones simplificadas. Ningun otro deberia hacer un require('sqlite3'). 
//        No se si esta bien abrir y cerrar conexiones todo el tiempo, creo que eso hace que se cuelgue un toque cuando le bombardeas comandos. Quizas convenga mantener la conexion abierta y/o tener una conexion por usuario activo

const sqlite3 = require('sqlite3').verbose();
module.exports = {
	
    openDatabase,

    closeDatabase,
	
	resetDatabase:function() {
		let db = openDatabase()        
		db.serialize(() => {
			//drops
			db.run('DROP TABLE IF EXISTS tcoins', [], function(err) {
				if (err) {
				 return console.error(err.message)
				}
				console.log(`Drop ${this.changes}`);
			})
			//creates
			.run('CREATE TABLE IF NOT EXISTS tcoins (userid INTEGER PRIMARY KEY, amount INTEGER)', [], function(err) {
				if (err) {
					return console.log(err.message);
				}
				console.log(`Table creation ok`);
				closeDatabase(db);
			})
			//inserts
			.run('INSERT INTO tcoins (userid,amount) VALUES (-1,0)'); //TO-DO: esto es solo si viene de newgame y habria q recibir la lista de IDs
		
		});
    }
/* otros ejemplos
openDatabase:function() {
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
*/
}


function openDatabase(){
	return new sqlite3.Database('./db/sqlite.db', (err) => {
		if (err) {
			return console.error(err.message);
		}
		console.log('Connected to SQlite database.');
	});
}

function closeDatabase(db){
	db.close((err) => {
		if (err) {
			return console.error(err.message);
		}
		console.log('Close the database connection.');
	});
}