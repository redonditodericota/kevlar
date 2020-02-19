// https://www.sqlitetutorial.net/sqlite-nodejs/

///TO-DO: Todo lo que es base de datos se tiene q encargar este archivo y proveer funciones simplificadas. Ningun otro deberia hacer un require('sqlite3'). 
//        No se si esta bien abrir y cerrar conexiones todo el tiempo, creo que eso hace que se cuelgue un toque cuando le bombardeas comandos. Quizas convenga mantener la conexion abierta y/o tener una conexion por usuario activo

const sqlite3 = require('sqlite3').verbose();
module.exports = {
	
    openDatabase,

    closeDatabase,
	
	resetDatabase:function() {
		//bbdd principal
		let db = openDatabase()        
		db.serialize(() => {
			//drops
			db.run('DROP TABLE IF EXISTS tcoins', [], function(err) {
				errorHandling(err,db)
			})
			.run('DROP TABLE IF EXISTS tordenes', [], function(err) {
				errorHandling(err,db)
			})
			.run('DROP TABLE IF EXISTS tmapa', [], function(err) {
				errorHandling(err,db)
			})
			.run('DROP TABLE IF EXISTS tlog', [], function(err) {
				errorHandling(err,db)
			})
			//creates
			.run('CREATE TABLE IF NOT EXISTS tcoins (userid INTEGER PRIMARY KEY, coinsAmount INTEGER, ataqueAmount INTEGER, defensaAmount INTEGER, explorarAmount INTEGER, influenciaAmount INTEGER, color TEXT, terrenosAmount INTEGER, liderBool INTEGER, beneficiarioBool INTEGER, ballotageBool INTEGER)', [], function(err) {
				errorHandling(err,db)
			})
			.run('CREATE TABLE IF NOT EXISTS tordenes (ordenid INTEGER PRIMARY KEY, userid integer, orden text)', [], function(err) {
				errorHandling(err,db)
			})
			.run('CREATE TABLE IF NOT EXISTS tmapa (terrenoid INTEGER PRIMARY KEY, userid integer, orden text)', [], function(err) {
				errorHandling(err,db)
			})
			.run('CREATE TABLE IF NOT EXISTS tlog (logid INTEGER PRIMARY KEY, userid integer, orden text)', [], function(err) {
				errorHandling(err,db)
			})
			//inserts
			 //TO-DO: inserts es solo si viene de newgame y habria q recibir la lista de IDs
			.run('INSERT INTO tcoins (userid,coinsAmount,ataqueAmount,defensaAmount,explorarAmount,influenciaAmount) VALUES (-1,0,0,0,0,0)', [], function(err) {
				errorHandling(err,db)
			})
		
		});
		
    },
	
	guardarOrden,
	leerOrdenes
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

function errorHandling(err, db){
	if (err) {
		closeDatabase(db);
		return console.error(err.message);
	}
}

function openDatabase(){
	return new sqlite3.Database('./db/sqlite.db', (err) => {
		if (err) {
			return console.error(err.message);
		}
	});
}

function closeDatabase(db){
	db.close((err) => {
		if (err) {
			return console.error(err.message);
		}
	});
}

function guardarOrden(orden){
	let db = openDatabase();
	db.run("INSERT INTO tordenes (userid, orden) VALUES (-1, '"+orden+"')", [], function(err) {
		errorHandling(err,db)
	})
	closeDatabase(db);
}
function leerOrdenes(callback){
	let db = openDatabase();
	let ret = "";
	//TO-DO: Esto tambien tiene q filtrar por userid
	db.all("SELECT orden FROM tordenes", [], function(err, rows) {
		errorHandling(err, db);
		rows.forEach((row) => {
			ret += row.orden + "\n";
		});
		closeDatabase(db);
		if (ret == "") ret = "No hay ordenes";
		callback(ret);
	});
	
}