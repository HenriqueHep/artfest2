// index.js (Para testes de Sequelize)
(async() => {
  const database = require('./database/db'); // Caminho corrigido para db.js
  const Usuarios = require('./models/Usuarios'); // Caminho corrigido para o modelo Usuarios
  const Produto = require('./models/Produto'); // Adicione o modelo Produto se quiser testá-lo

  try {
    await database.sync({ alter: true }); // Sincroniza o DB, criando tabelas se não existirem
    console.log('Banco de dados sincronizado a partir de index.js');

    // Exemplo de uso com Usuarios
    await Usuarios.create({
      email: "teste@example.com", // Mude para 'email'
      senha: "minhasenha123" // Mude para 'senha'
    });
    console.log("Usuário de teste criado.");

    const alterProd = await Usuarios.findByPk(1);
    if (alterProd) {
      alterProd.email = "atualizado@example.com";
      await alterProd.save();
      console.log("Usuário atualizado.");
    }

    const findAllProd = await Usuarios.findAll();
    console.log("Todos os usuários:", findAllProd.map(u => u.toJSON()));

    // Exemplo de uso com Produto (se você quiser testar)
    // await Produto.create({
    //   nome: "Camiseta",
    //   descricao: "Camiseta de algodão",
    //   preco: 29.99
    // });
    // console.log("Produto de teste criado.");

  } catch (error) {
    console.error('Erro ao sincronizar ou operar o DB a partir de index.js:', error);
  }
})();