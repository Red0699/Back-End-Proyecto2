const conexion = require('../connection/conexion');

const clienteSchema = {};

//Listar todos los clientes
clienteSchema.getClientes = function(callback){
    if(conexion){
        var sql = "SELECT * FROM cliente ORDER BY idCliente";
        conexion.query(sql, function(error, rows){
            if(error){
                throw error;
            }else{
                callback(null, rows);
            }
        });
    }
}

//Agregar un nuevo cliente
clienteSchema.insertCliente = function(data, callback){
    if(conexion){
        var sql = "INSERT INTO cliente SET ?";

        conexion.query(sql, data, function(error, result){
            if(error){
                throw error;
            }else{
                callback(null, {"msg": "Registro Insertado"});
            }
        });
    }
}

//Obtener un cliente
clienteSchema.getCliente = function(id, callback){
    if(conexion){
        var sql = "SELECT * FROM cliente WHERE idCliente = " + conexion.escape(id) + ";";
        conexion.query(sql, function(error, row){
            if(error){
                throw error;
            }else{
                callback(null, row);
            }
        });
    }
}

//actualizar un cliente
clienteSchema.updateCliente = function(id ,data, callback){
    if(conexion){
        var sql = "UPDATE cliente SET "
                    + "nombre = " + conexion.escape(data.nombre)
                    + ", apellido = " + conexion.escape(data.apellido)
                    + ", telefono = " + conexion.escape(data.telefono)
                    + ", correo = " + conexion.escape(data.correo)
                    + " WHERE idCliente = " + conexion.escape(id) + ";";
        conexion.query(sql, function(error, result){
            if(error){
                throw error;
            }else{
                callback(null, {"msg": "Cliente actualizado"})
            }
        });
    }

}


module.exports = clienteSchema;