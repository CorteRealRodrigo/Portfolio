const mongoose = require('mongoose');
const validator = require('validator');

const HomeSchema = new mongoose.Schema({
    nomeEmpresa: { type: String, required: true},
    email: { type: String, required: true},
    cargo: { type: String, required: true},
    descricao: { type: String, required: true},
    dataHora: {type: Date, default: Date.now}
});

const HomeModel = mongoose.model('Home', HomeSchema);

class Home {
    constructor(body) {
        this.body = body;
        this.errors = [];
        //this.user = null;
    }
    async register() {
        this.valida(); // Faz a verificação de erros
        if(this.errors.length > 0) return; // Caso tenha algum erro, parar o envio.
        await this.userExists(); // Chega se o email já existe.
        if(this.errors.length > 0) return;
        try {
            await HomeModel.create(this.body); // Enviando para a base de dados.
        } catch(e) {
            console.log(e);
        }
    }

    async userExists() { // Chega se o email já existe.
        const user = await HomeModel.findOne({ email: this.body.email });
        if(user) this.errors.push("E-mail já cadastrado.");
    }

    valida() {
        this.cleanUp();
        if(!this.body.nomeEmpresa) this.errors.push('Informe o nome da empresa.');
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');
        if(!this.body.cargo) this.errors.push('Informe o cargo.');
        if(!this.body.descricao) this.errors.push('Descreva a vaga.');
    }
    cleanUp() { // Verifica se todos os imputs do form são strings.
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body = { // Pega todos os imputs do body
            nomeEmpresa: this.body.nomeEmpresa,
            email: this.body.email,
            cargo: this.body.cargo,
            descricao: this.body.descricao,
        };
    }
}

module.exports = Home;









