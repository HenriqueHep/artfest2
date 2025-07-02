// app.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/db');
const cors = require('cors');
const path = require('path'); // Novo: para lidar com caminhos de arquivo

require('dotenv').config();

const Usuarios = require('./models/Usuarios');
const Produto = require('./models/Produto');

const produtoRoutes = require('./routes/produtoRoute');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware CORS
app.use(cors());

// Outros Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- SERVINDO ARQUIVOS ESTÁTICOS DO FRONTEND ---
// Define a pasta 'frontend' como raiz para arquivos estáticos
// Certifique-se de que a pasta 'frontend' está no mesmo nível que 'backend'
app.use(express.static(path.join(__dirname, '../frontend'))); // Assume que frontend está um nível acima de backend

// Rota para a página inicial (login.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// --- FIM SERVINDO ARQUIVOS ESTÁTICOS ---


// Rotas da API
app.use('/produtos', produtoRoutes);
app.use('/auth', userRoutes);

// Removendo a rota de teste simples "/" pois agora estamos servindo o login.html
// app.get('/', (req, res) => {
//   res.send('API está funcionando!');
// });


// Sincronizar o banco de dados e iniciar o servidor
(async () => {
  try {
    await db.sync({ alter: true });
    console.log('Banco de dados sincronizado com sucesso!');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
})();