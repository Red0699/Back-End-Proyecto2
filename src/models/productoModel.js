const conexion = require('../connection/conexion');

const productoSchema = {};

//Listar todos los productos
productoSchema.getProductos = function(callback){
    if(conexion){
        var sql = "SELECT * FROM producto WHERE estadoProd = 'Activo' ORDER BY idProducto";
        conexion.query(sql, function(error, rows){
            if(error){
                throw error;
            }else{
                callback(null, rows);
            }
        });
    }
}

//Agregar un nuevo producto
productoSchema.insertProducto = function(data, callback){
    if(conexion){
        var sql = "INSERT INTO producto SET ?";

        conexion.query(sql, data, function(error, result){
            if(error){
                throw error;
            }else{
                callback(null, {"msg": "Registro Insertado"});
            }
        });
    }
}

//Obtener un producto
productoSchema.getProducto = function(id, callback){
    if(conexion){
        var sql = "SELECT * FROM producto WHERE idProducto = " + conexion.escape(id) + ";";
        conexion.query(sql, function(error, row){
            if(error){
                throw error;
            }else{
                callback(null, row);
            }
        });
    }
}

//actualizar un producto
productoSchema.updateProducto = function(id ,data, callback){
    if(conexion){
        var sql = "UPDATE producto SET "
                    + "descripcion = " + conexion.escape(data.descripcion)
                    + ", almacen = " + conexion.escape(data.almacen)
                    + ", idCategoria = " + conexion.escape(data.idCategoria)
                    + ", estadoProd = " + conexion.escape(data.estadoProd)
                    + " WHERE idProducto = " + conexion.escape(id) + ";";
        conexion.query(sql, function(error, result){
            if(error){
                throw error;
            }else{
                callback(null, {"msg": "producto actualizado"})
            }
        });
    }

}

productoSchema.updateProdEntrada = function(id, data, callback){
    if(conexion){
        var sql = "UPDATE producto SET "
                    + "precioCompra = " + conexion.escape(data.precioCompra)
                    + ", precioVenta = " + conexion.escape(data.precioVenta)
                    + ", stock = " + conexion.escape(data.stock)
                    +", estadoEntrada = " + conexion.escape(data.estadoEntrada)
                    + " WHERE idProducto = " + conexion.escape(id) + ";";
        conexion.query(sql, function(error, result){
            if(error){
                throw error;
            }else{
                callback(null, {"msg": "producto actualizado"})
            }
        });
    }
}

module.exports = productoSchema;