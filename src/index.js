const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

//rutas
const usuarioRoutes = require('./routes/usuarioRuta');
const clienteRoutes = require('./routes/clienteRuta');
const proveedorRoutes = require('./routes/proveedorRuta');
const productoRoutes = require('./routes/productoRuta');
const login = require('./routes/login');
const entradaRoutes = require('./routes/entradaRuta')
const salidaRoutes = require('./routes/salidaRuta')

//auteticación
const auth = require('./routes/auth');

//CORS
app.use(cors())



// authentication endpoint
app.get("/api/auth-endpoint", auth, (request, response) => {
    response.json({ message: "You are authorized to access me" });
  });


//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = require('./swagger/swagger');

//middlewares

app.get('/', (req,res) => {
    res.send("Prueba de API");
});

app.use(cors());

app.use(express.json());
app.use('/api', proveedorRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', clienteRoutes);
app.use('/api', productoRoutes);

app.use('/api', login);
app.use('/api', entradaRoutes);
app.use('/api', salidaRoutes);
app.use('/api-swagger', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));


app.listen(port, () => console.log('Servidor escuchando en', port));
