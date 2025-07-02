// controllers/userController.js
const Usuarios = require('../models/Usuarios');
const bcrypt = require('bcryptjs'); // Para hash de senhas
// const jwt = require('jsonwebtoken'); // Para autenticação baseada em tokens (se for usar)

// Função para registrar um novo usuário
exports.register = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // 1. Verificar se o usuário já existe
    const existingUser = await Usuarios.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email já cadastrado.' });
    }

    // 2. Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10); // 10 é o salt rounds

    // 3. Criar o novo usuário no banco de dados
    const newUser = await Usuarios.create({
      email,
      senha: hashedPassword // Salvar a senha com hash
    });

    // Opcional: Gerar um token JWT aqui se for logar automaticamente após o registro
    // const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      userId: newUser.id
      // token: token // Se usar JWT
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
};

// Função para login de usuário
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // 1. Encontrar o usuário pelo email
    const user = await Usuarios.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    // 2. Comparar a senha fornecida com a senha com hash no banco de dados
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    // 3. Login bem-sucedido - Gerar token JWT (MUITO RECOMENDADO para autenticação)
    // Certifique-se de ter `process.env.JWT_SECRET` definido (usando dotenv)
    // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login bem-sucedido!',
      userId: user.id
      // token: token // Se usar JWT
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
};

// Opcional: Obter detalhes do usuário (pode precisar de middleware de autenticação)
exports.getUserProfile = async (req, res) => {
  try {
    // req.user.id viria de um middleware de autenticação JWT
    const user = await Usuarios.findByPk(req.params.id || req.user.id, {
      attributes: ['id', 'email'] // Não retorne a senha!
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error);
    res.status(500).json({ message: 'Erro ao buscar perfil do usuário.' });
  }
};

// Opcional: Atualizar perfil do usuário
exports.updateUser = async (req, res) => {
  try {
    // req.user.id viria de um middleware de autenticação JWT para garantir que o usuário está atualizando o próprio perfil
    const { email, senha } = req.body;
    let updateData = { email };

    if (senha) {
      updateData.senha = await bcrypt.hash(senha, 10);
    }

    const [updatedRows] = await Usuarios.update(updateData, {
      where: { id: req.params.id || req.user.id }
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado para atualização.' });
    }
    res.json({ message: 'Perfil atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro ao atualizar perfil.' });
  }
};