const dataSource = require('../database/models');

class Services{
  constructor(nomeDoModel){
    this.model = nomeDoModel;
  }

  async listarTodosOsRegistros(){
    return dataSource[this.model].findAll();
  }

  async pegaUmRegistroPorId(id) {
    return dataSource[this.model].findByPk(id);
  }

  async criaRegistro(dadosDoRegistro) {
    return dataSource[this.model].create(dadosDoRegistro);
  }

  async atualizaRegistro(dadosAtualizados, id){
    const listaRegistrosAtualizados = dataSource[this.model].update(dadosAtualizados, {
      where: {id: id}
    });
    if(listaRegistrosAtualizados[0] === 0){
      return false;
    }
    return true;
  }

  async excluiRegistro(id) {
    return dataSource[this.model].destroy({ where: { id: id } });
  }
}

module.exports = Services;