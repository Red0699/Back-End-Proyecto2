const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const conexiondb = require('./connection/conexion');
const cors = require('cors');

//rutas
const usuarioRoutes = require('./routes/usuarioRuta');
const clienteRoutes = require('./routes/clienteRuta');
const proveedorRoutes = require('./routes/proveedorRuta');
const productoRoutes = require('./routes/productoRuta');
const login = require('./routes/login');

//auteticación
const auth = require('./routes/auth');

app.use(cors())

app.get('/', (req,res) => {
    res.send("Prueba de API");
});

// authentication endpoint
app.get("/api/auth-endpoint", auth, (request, response) => {
    response.json({ message: "You are authorized to access me" });
  });


//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = require('./swagger/swagger');

//middlewares

app.use(cors());

app.use(express.json());
app.use('/api', proveedorRoutes);
//app.use('/api-proveedor', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec.proveedor)));
app.use('/api', usuarioRoutes);
app.use('/api-usuario', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec.usuario)));
app.use('/api', clienteRoutes);
//app.use('/api-cliente', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec.cliente)));
app.use('/api', productoRoutes);
//app.use('/api-producto', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec.producto)));
app.use('/api', login);
/*
app.use(cors({
    origin: 'http://localhost:3000/usuarios',
    origin: ''
}));
*/

app.listen(port, () => console.log('Servidor escuchando en', port));
