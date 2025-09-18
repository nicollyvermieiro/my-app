const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados.');
});

app.get('/', (req, res) => {
  res.send('Aplicação Dockerizada – [Nicolly]');
});

app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});
