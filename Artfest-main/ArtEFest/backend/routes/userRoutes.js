// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Importa o controller de usuários

// Rota para o registro de novos usuários
// Um POST para /auth/register que chama a função register do userController
router.post('/register', userController.register);

// Rota para o login de usuários existentes
// Um POST para /auth/login que chama a função login do userController
router.post('/login', userController.login);

// --- Rotas Opcionais e Recomendadas (com middleware de autenticação) ---
// Se você implementar autenticação JWT ou de sessão, você provavelmente terá um middleware
// para proteger certas rotas que exigem que o usuário esteja logado.

// Exemplo de como seria uma rota para obter o perfil do usuário logado:
// const authMiddleware = require('../middleware/authMiddleware'); // Crie este arquivo se for usar
// router.get('/profile', authMiddleware, userController.getUserProfile);

// Exemplo de como seria uma rota para atualizar o perfil do usuário logado:
// router.put('/profile', authMiddleware, userController.updateUser);

module.exports = router;