const path = require("path");
const baseUrl = 'http://localhost:5000';
const swaggerSpec = {};

const baseDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Api Inventario",
        version: "1.0.0"
    },
    servers: [
        {
            url: baseUrl
        }
    ]
}

swaggerSpec.proveedor = {
    definition: baseDefinition,
    apis: [`${path.join(__dirname, "../routes/proveedorRuta.js")}`]
}

swaggerSpec.usuario = {
    definition: baseDefinition,
    apis: [`${path.join(__dirname, "../routes/usuarioRuta.js")}`]
}

swaggerSpec.cliente = {
    definition: baseDefinition,
    apis: [`${path.join(__dirname, "../routes/clienteRuta.js")}`]
}

swaggerSpec.producto = {
    definition: baseDefinition,
    apis: [`${path.join(__dirname, "../routes/productoRuta.js")}`]
}


module.exports = swaggerSpec;