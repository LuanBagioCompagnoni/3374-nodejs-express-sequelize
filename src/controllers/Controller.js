class Controller{
  constructor(entidadeService){
    this.entidadeService = entidadeService;
  }

  async listarTodos(req, res){
    try {
      const listaDeRegistros = await this.entidadeService.listarTodosOsRegistros();
      return res.status(200).json(listaDeRegistros);
    } catch (error) {
      //erro
    }
  }

  async pegaUmPorId(req, res) {
    const { id } = req.params;
    try {
      const umRegistro = await this.entidadeService.pegaUmRegistroPorId(Number(id));
      return res.status(200).json(umRegistro);
    } catch (erro) {
      // erro
    }
  }

  async criaNovo(req, res) {
    const dadosParaCriacao = req.body;
    try {
      const novoRegistroCriado = await this.entidadeService.criaRegistro(dadosParaCriacao);
      return res.status(200).json(novoRegistroCriado);
    } catch (erro) {
      // erro
    }
  }

  async atualiza(req, res){
    const { id } = req.params;
    const dadosAtualizados = req.body;
    try {
      const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, Number(id));
      console.log(foiAtualizado);
      if(!foiAtualizado){
        return res.status(400).json({mensagem: 'Registro não foi atualizado!'});
      }
      res.status(200).json({mensagem: 'Atualizado com sucesso!'});
    } catch (error) {
      //erro
    }
  }

  async exclui(req, res) {
    const { id } = req.params;
    try {
      await this.entidadeService.excluiRegistro(Number(id));
      return res.status(200).json({ mensagem: `id ${id} deletado` });


    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = Controller;