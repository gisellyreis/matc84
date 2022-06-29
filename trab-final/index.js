
const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

let db = [];

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/todos', (req, res) => {
    db = JSON.parse(fs.readFileSync('./db.json'));
    res.json(db);
});

app.post('/todo', (req, res) => {
    //const { id, tarefa } = req.body;
    try {
    const data = fs.readFileSync('./db.json', 'utf8');
    console.log(data);
    try {
        db = JSON.parse(data);
        db.push( req.body );
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

app.delete('/todo/:id', (req, res) => {
const { id } = req.params;
db = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
db.find((item, index) => {
    console.log(item.id);
    if (item.id == id) {
        db.splice(index, 1);
        fs.writeFileSync('./db.json', JSON.stringify(db));
        return res.json(db);
    }})
});