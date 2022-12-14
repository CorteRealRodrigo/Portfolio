require('dotenv').config(); // Para esconder dados pessoais.(variável de embiente, onde contem senhas, links e etc.)
const express = require('express'); // Para tratar as rotas.
const app = express();
const mongoose = require('mongoose'); // Para conectar com a base de dados e tratar os dados(modelar).
mongoose.connect(process.env.CONNECTION) // Está pegando o link de acesso do banco de dados do .env.
    .then(() => {
        app.emit('pronto');
    })
    .catch(e => console.log(e)); // Primero a plicação conecta com a base de dados, depois começa a rodar na porta desejada.

// Utilizar se o projeto necessitar de login e senha.
const session = require('express-session'); // Para salvar a sessão na memória(cook con info de usuário).
const MongoStore = require('connect-mongo'); // Para se conectar com a base de dados e salvar a session dentro da base de dados e não no servidor.
const flash = require('connect-flash'); // Mensagens de aviso que somem.

const routes = require('./routes'); // Pegando as rotas routes.js
const path = require('path'); // Para pegar os caminhos.

// Se o sistema estiver sem SSL (sem https na URL), desativar o helmet, pois ele impede algumas importações como CSS e JS.
//const helmet = require('helmet'); // (Segurança) Para proteger o site.
const csrf = require('csurf'); // (Segurança) Vai gerar uma senha para o metodo post do formulário(nenhum site externo consegue postar dentro da aplicação.).
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware'); // lincando com o middleware(funções q são executadas nas rotas.)

// Se o sistema estiver sem SSL (sem https na URL), desativar o helmet, pois ele impede algumas importações como CSS e JS.
//app.use(helmet()); // Para o app usar o helmet.
app.use(express.urlencoded({ extended: true })); // Para receber/tratar o metodo POST.
app.use(express.json()); // Para receber dados Json. 
app.use(express.static(path.resolve(__dirname, 'public'))); // Para pegar o caminho absoluto da pasta public (css, img, js).

// Utilizar se o projeto necessitar de login e senha.
const sessionOptions = session({ // configurando as sessões.
    secret: 'senha:ro login:123',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTION }), // Onde vão ser salvos as informoções como ex login e senha.
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }// por quanto tempo o cooks vão aparecer (7dias).
}); 
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views')); // Para pegar o caminho absoluto da pasta views.
app.set('view engine', 'ejs'); // Para renderizar os views(HTML), utilizando sjs, (para utilizar if, for e etc.)

app.use(csrf()); // Para o app execuatar a veríficação do form pelo csrf.
app.use(middlewareGlobal); // Middleware global.
app.use(checkCsrfError); // Para checar se ocorreu o erro(sem a senha do csrf).
app.use(csrfMiddleware); // Caso tenha a senha do csrf, enviar o fomulário.
app.use(routes); // Para o app estar utilizando as rotas.

app.on('pronto', () => { // Quando o app conectar vai emitir um sinal de pronto, e então rodar a aplicação.
    app.listen(3000, () => {
        console.log('http://localhost:3000');
    }); // Para o app estar rodando na porta 3000.
});
