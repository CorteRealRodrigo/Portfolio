const {async}=require('regenerator-runtime');
const Home = require('../models/HomeModel');

exports.homePage = (req, res) => {
   res.render('index');
   return;
}; // O que vai estar exibindo na página inicial.

exports.treatPost = async function(req, res) {
    try {
        const home = new Home(req.body);
        await home.register();

        if(home.errors.length > 0) {
            req.flash('errors', home.errors);
            req.session.save(function() {
                return res.redirect('#oferta');
            }); // Salvar a sessão antes de redirecionar para a home.
            return;
    }
    req.flash('success', 'Dados enviados com sucesso.');
    req.session.save(function() {
        return res.redirect('#oferta');
    });
    } catch(e) {
        return res.send(e);
    }
}; // Trata o post do formulário.