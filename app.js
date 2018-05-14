const express = require('express');
const app = express();
const port = 3000;
const caquiCoders = require('./caqui-coders');
const bodyParser = require('body-parser');

app.use(bodyParser.json());


app.listen(port, (req,res) => {
    console.log(`Servidor rodando na porta ${port}`);
});

app.get('/participante', (req, res) => {
    res.send(caquiCoders);
});

app.get('/participante/:id', (req, res) => {
    const participante = caquiCoders.filter(part => {
        return part.id.toString() === req.params.id;
    })
    if(!participante.length) {
        res.status(204);
        res.send();
        return;
    }
    res.send(participante[0]);
});

app.post('/participante', (req, res) => {
    const body = req.body || {};
    if(!body.name) {
        res.status(412);
        res.send('Nome não encontrado');
        return;
    }
    const novoParticipante = {
        id: caquiCoders[caquiCoders.length -1].id++,
        name: body.name,
        funcao: body.funcao
    };
    caquiCoders.push(novoParticipante);
    res.status(201);
    res.send('Criado com sucesso!');
})