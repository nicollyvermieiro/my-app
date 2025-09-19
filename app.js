const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3000;

let db;

// Função de conexão com retry automático
function connectWithRetry() {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  db.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados. Tentando novamente em 5s...');
      setTimeout(connectWithRetry, 5000); // tenta reconectar após 5 segundos
    } else {
      console.log('Conectado ao banco de dados.');
      initializeDatabase(); // só chama depois da conexão bem-sucedida
    }
  });

  db.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.warn('Conexão com o banco perdida. Reconnectando...');
      connectWithRetry();
    } else {
      throw err;
    }
  });
}

// Função para criar tabela e inserir usuários
function initializeDatabase() {
  const createTable = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE
    )
  `;

  db.query(createTable, (err) => {
    if (err) {
      console.error('Erro ao criar tabela:', err);
      return;
    }
    console.log('Tabela "usuarios" verificada/criada com sucesso.');

    const checkIfEmpty = 'SELECT COUNT(*) AS total FROM usuarios';

    db.query(checkIfEmpty, (err, result) => {
      if (err) {
        console.error('Erro ao verificar tabela:', err);
        return;
      }

      const total = result[0].total;
      if (total === 0) {
        const insertUsers = `
          INSERT INTO usuarios (nome, email) VALUES
          ('João Silva', 'joao@email.com'),
          ('Nicolas Vermieiro', 'nicolas@email.com'),
          ('Nicolly Vermieiro', 'nicolly@email.com')
        `;

        db.query(insertUsers, (err) => {
          if (err) {
            console.error('Erro ao inserir usuários:', err);
            return;
          }
          console.log('Usuários fictícios inseridos com sucesso.');
        });
      } else {
        console.log('Usuários já existem. Nenhum dado foi inserido.');
      }
    });
  });
}

// Iniciar a conexão com retry automático
connectWithRetry();

// Rotas
app.get('/', (req, res) => {
  res.send('Aplicação Dockerizada – Nicolly');
});

app.get('/usuarios', (req, res) => {
  if (!db) {
    return res.status(500).json({ error: 'Banco de dados não conectado.' });
  }

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
