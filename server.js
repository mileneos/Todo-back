const express = require('express');
const http = require('http');
const bodyParser = require("body-parser")
const cors = require('cors');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ToDo', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres'
});

const db = require("./app/models");
db.sequelize.sync();





const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    console.log('URL = ', req.url);
    console.log('Original_URL = ', req.originalUrl);
    console.log('METHOD = ', req.method);
    console.log('HOST = ', req.headers.host);
    console.log('IsSecure = ', req.secure);
    console.log('BODY', req.body);
    console.log('QUERY', req.query);

    next();
});

require("./app/routers/todo.routes")(app);


http.createServer(app).listen(3000, () => {
    console.log('Server is working on port 3000');
})

app.all('/test', (req, res) => {
    res.status(200).json({ message: 'KKKKKK' });
})


app.get('/get', (req, res) => {
    console.log(`GET`);
    res.send(`GET`);
});

app.post('/post', (req, res) => {
    console.log(`POST`);
    res.send(`POST`);
})

app.put('/put', (req, res) => {
    console.log('PUT')
    res.send('PUT')
})

app.patch('/patch', (req, res) => {
    console.log('PATCH')
    res.send('PATCH')
})

app.delete('/delete', (req, res) => {
    console.log('DELETE')
    res.send('DELETE')
})

