const express = require('express');
const route = express.Router(); // Para dividir as rotas/manipular.
const homecontroller = require('./src/controllers/homeController');

// Rotas da home.
route.get('/', homecontroller.homePage); // Página inícial.
route.post('/', homecontroller.treatPost); // Trata post formulário.

module.exports = route; // exportando todas as rotas.
