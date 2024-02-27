const converteIds = require('../utils/conversorString.js');

class Controller{
  constructor(entidadeService){
    this.entidadeService = entidadeService;
  }

  async listarTodos(req, res){
    try {
      const listaDeRegistros = await this.entidadeService.listarTodosOsRegistros();
      return res.status(200).json(listaDeRegistros);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message});
    }
  }

  async pegaUmPorId(req, res) {
    const { ...params } = req.params;
    try {
      const umRegistro = await this.entidadeService.pegaUmRegistroPorId(params);
      return res.status(200).json(umRegistro);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message});
    }
  }

  async pegaUm(req, res) {
    const { ...params } = req.params;
    const where = converteIds(params);
    try {
      const umRegistro = await this.entidadeService.pegaUmRegistro(where);
      return res.status(200).json(umRegistro);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message});
    }
  }

  async criaNovo(req, res) {
    const dadosParaCriacao = req.body;
    try {
      const novoRegistroCriado = await this.entidadeService.criaRegistro(dadosParaCriacao);
      return res.status(200).json(novoRegistroCriado);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message});
    }
  }

  async atualiza(req, res){
    const { ...params } = req.params;
    const dadosAtualizados = req.body;
    const where =  converteIds(params);
    try {
      const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, where);
      console.log(foiAtualizado);
      if(!foiAtualizado){
        return res.status(400).json({mensagem: 'Registro não foi atualizado!'});
      }
      res.status(200).json({mensagem: 'Atualizado com sucesso!'});
    } catch (erro) {
      return res.status(500).json({ erro: erro.message});
    }
  }

  async exclui(req, res) {
    const { id } = req.params;
    try {
      await this.entidadeService.excluiRegistro(Number(id));
      return res.status(200).json({ mensagem: `id ${id} deletado` });


    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }
}

module.exports = Controller;