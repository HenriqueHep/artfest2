// controllers/produtosController.js
const Produto = require('../models/Produto'); // Importa o modelo Sequelize de Produto

exports.getAll = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar produtos.');
  }
};

exports.getById = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    res.json(produto);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar produto.');
  }
};

exports.create = async (req, res) => {
  try {
    const novoProduto = await Produto.create(req.body);
    res.status(201).json(novoProduto);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar produto.');
  }
};

exports.update = async (req, res) => {
  try {
    const [updatedRows] = await Produto.update(req.body, {
      where: { id: req.params.id }
    });
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Produto não encontrado para atualização.' });
    }
    res.json({ message: 'Produto atualizado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao atualizar produto.');
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedRows = await Produto.destroy({
      where: { id: req.params.id }
    });
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Produto não encontrado para exclusão.' });
    }
    res.json({ message: 'Produto deletado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao deletar produto.');
  }
};