const conexion = require('../connection/conexion');

const proveedorSchema = {};

//Listar todos los proveedores
proveedorSchema.getProveedores = function(callback){
    if(conexion){
        var sql = "SELECT * FROM proveedor ORDER BY idProveedor";
        conexion.query(sql, function(error, rows){
            if(error){
                throw error;
            }else{
                callback(null, rows);
            }
        });
    }
}

//Agregar un nuevo proveedor
proveedorSchema.insertProveedor = function(data, callback){
    if(conexion){
        var sql = "INSERT INTO proveedor SET ?";

        conexion.query(sql, data, function(error, result){
            if(error){
                throw error;
            }else{
                callback(null, {"msg": "Registro Insertado"});
            }
        });
    }
}

//Obtener un proveedor
proveedorSchema.getProveedor = function(id, callback){
    if(conexion){
        var sql = "SELECT * FROM proveedor WHERE idProveedor = " + conexion.escape(id) + ";";
        conexion.query(sql, function(error, row){
            if(error){
                throw error;
            }else{
                callback(null, row);
            }
        });
    }
}

//actualizar un proveedor
proveedorSchema.updateProveedor = function(id ,data, callback){
    if(conexion){
        var sql = "UPDATE proveedor SET "
                    + "nombre = " + conexion.escape(data.nombre)
                    + ", apellido = " + conexion.escape(data.apellido)
                    + ", telefono = " + conexion.escape(data.telefono)
                    + ", correo = " + conexion.escape(data.correo)
                    + " WHERE idProveedor = " + conexion.escape(id) + ";";
        conexion.query(sql, function(error, result){
            if(error){
                throw error;
            }else{
                callback(null, {"msg": "Proveedor actualizado"})
            }
        });
    }

}


module.exports = proveedorSchema;