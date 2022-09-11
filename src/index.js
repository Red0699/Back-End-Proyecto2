const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const conexiondb = require('./connection/conexion');

//rutas
const usuarioRoutes = require('./routes/usuarioRuta');
const clienteRoutes = require('./routes/clienteRuta');

app.get('/', (req,res) => {
    res.send("Prueba de API");
});

//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = require('./swagger/swagger');

//middlewares
app.use(express.json());
app.use('/api', usuarioRoutes);
app.use('/api-usuario', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec.usuario)));
app.use('/api', clienteRoutes);
app.use('/api-cliente', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec.cliente)));

//CORS
app.use(function (req, res, next)
{

    // Sitio web al que desea permitir que se conecte
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // A que métodos que desea dar permisos
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // A que  encabezados se les va a dar permiso
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    //Establezca en verdadero si necesita que el sitio web incluya cookies en las solicitudes enviadas
    //a la API (por ejemplo, en caso de que use sesiones)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pase a la siguiente capa de middleware
    next();
});

app.listen(port, () => console.log('Servidor escuchando en', port));
