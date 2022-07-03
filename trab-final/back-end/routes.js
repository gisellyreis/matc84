const express = require('express');

const routes = express.Router();

const fs = require('fs');

let db = [];

routes.get('/todos', (req, res) => {
    db = JSON.parse(fs.readFileSync('./db.json'));
    res.json(db);
});

routes.post('/todo', (req, res) => {
    //const { id, tarefa } = req.body;
    try {
        const data = fs.readFileSync('./db.json', 'utf8');
        console.log(data);
        try {
            db = JSON.parse(data);
            db.push(req.body);
            console.log(db);
            fs.writeFileSync('./db.json', JSON.stringify(db));
            console.log('Salvo com sucesso');
            return res.send(db);
        } catch (err) {
            console.error(err);
        }
        return
    } catch (err) {
        console.error(err);
    }
});

routes.delete('/todo/:id', (req, res) => {
    const { id } = req.params;
    db = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
    db.find((item, index) => {
        console.log(item.id);
        if (item.id == id) {
            db.splice(index, 1);
            fs.writeFileSync('./db.json', JSON.stringify(db));
            return res.json(db);
        }
    })
});

routes.put('/todo/:id', (req, res) => {
    const { id } = req.params;
    const { tarefa } = req.body.tarefa;
    const { check } = req.body.check;
    db = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
    db.find((item, index) => {
        if (item.id == id) {
            db[index].tarefa = tarefa;
            db[index].check = check;
            fs.writeFileSync('./db.json', JSON.stringify(db));
            return res.json(db);
        }
    }
    )
});

module.exports = routes;