const path = require("path");
const baseUrl = 'http://localhost:3000';

const swaggerSpec = {
    usuario: {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Api Inventario (Usuarios)",
                version: "1.0.0"
            },
            servers: [
                {
                    url: baseUrl
                }
            ]
        },
        apis: [`${path.join(__dirname, "../routes/usuarioRuta.js")}`]
    },
    cliente: {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Api Inventario (Clientes)",
                version: "1.0.0"
            },
            servers: [
                {
                    url: baseUrl
                }
            ]
        },
        apis: [`${path.join(__dirname, "../routes/clienteRuta.js")}`]
    }
}
module.exports = swaggerSpec;