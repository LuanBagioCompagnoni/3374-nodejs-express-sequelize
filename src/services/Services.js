const dataSource = require('../database/models');

class Services{
  constructor(nomeDoModel){
    this.model = nomeDoModel;
  }

  async pegaRegistrosPorEscopo(escopo){
    return dataSource[this.model].scope(escopo).findAll();
  }

  async contaRegistros(options){
    return dataSource[this.model].findAndCountAll({...options});
  }

  async listarTodosOsRegistros(where = {}){
    return dataSource[this.model].findAll( {where: { ...where } });
  }

  async pegaUmRegistroPorId(id) {
    return dataSource[this.model].findByPk(id);
  }

  async pegaUmRegistro(where) {
    return dataSource[this.model].findOne({where: {...where}});
  }


  async criaRegistro(dadosDoRegistro) {
    return dataSource[this.model].create(dadosDoRegistro);
  }

  async atualizaRegistro(dadosAtualizados, where){
    const listaRegistrosAtualizados = dataSource[this.model].update(dadosAtualizados, {
      where: { ...where }
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