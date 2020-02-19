module.exports = {
	
    tirarDados:function(caras, cantidad){
		var suma = 0;
		if (cantidad == null || cantidad < 1) cantidad = 1;
		for(var i=0;i<cantidad;i++){
			suma += Math.floor(Math.random() * caras) + 1;
		}
		return suma;
	}
}