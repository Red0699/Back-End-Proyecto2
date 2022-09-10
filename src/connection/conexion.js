const mysql = require('mysql');
const settings = require('./config.json');
var connection;

function connectDatabase() 
{
  if(!connection) 
  {
    connection = mysql.createConnection(settings);

    connection.connect(function(err)
    {
      if(!err) 
      {
        console.log('Base de Datos Conectada');
      } 
      else 
      {
        console.log('Error en la conexión con la Base de Datos' + err);
      }
    });
  }
  return connection;
}

module.exports = connectDatabase();