const conexion = require('../connection/conexion');
const jwt = require("jsonwebtoken");
const usuarioSchema = {};

//Listar todos los usuarios
usuarioSchema.getUsuarios = function(callback){
    if(conexion){
        var sql = "SELECT * FROM usuario WHERE estado = 'Activo' ORDER BY idUsuario";
        conexion.query(sql, function(error, rows){
            if(error){
                throw error;
            }else{
                callback(null, rows);
            }
        });
    }
}

//Agregar un nuevo usuario
usuarioSchema.insertUsuario = function(data, callback){
    if(conexion){
        var sql = "INSERT INTO usuario SET ?";

        conexion.query(sql, data, function(error, result){
            if(error){
                throw error;
            }else{
                callback(null, {"msg": "Registro Insertado"});
            }
        });
    }
}

//Obtener un Usuario
usuarioSchema.getUsuario = function(id, callback){
    if(conexion){
        var sql = "SELECT * FROM usuario WHERE idUsuario = " + conexion.escape(id) + ";";
        conexion.query(sql, function(error, row){
            if(error){
                throw error;
            }else{
                callback(null, row);
            }
        });
    }
}

//actualizar un usuario
usuarioSchema.updateUsuario = function(id, data, callback){
    if(conexion){
        var sql = "UPDATE usuario SET "
                    + "primerNombre = " + conexion.escape(data.primerNombre)
                    + ", segundoNombre = " + conexion.escape(data.segundoNombre)
                    + ", apellidoPaterno = " + conexion.escape(data.apellidoPaterno)
                    + ", apellidoMaterno = " + conexion.escape(data.apellidoMaterno)
                    + ", telefono = " + conexion.escape(data.telefono)
                    + ", correo = " + conexion.escape(data.correo)
                    + ", contraseña = " + conexion.escape(data.contraseña)
                    + ", idRol = " + conexion.escape(data.idRol)
                    + ", estado = " + conexion.escape(data.estado)
                    + " WHERE idUsuario = " + conexion.escape(id) + ";";
        conexion.query(sql, function(error, result){
            if(error){
                throw error;
            }else{
                callback(null, {"msg": "Usuario actualizado"})
            }
        });
    }
}

module.exports = usuarioSchema;