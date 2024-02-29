const Services = require('./Services.js');
const dataSource = require('../database/models');

class PessoaServices extends Services {
  constructor(){
    super('Pessoa');
    this.matriculaServices = new Services('Matricula');
  }

  async pegaMatriculasAtivasPorEstudante(id){
    const estudante = await super.pegaUmRegistroPorId(id);
    const listaMatriculas = await estudante.getAulasMatriculadas(); //metodo gerado automaticamente pelo sequelize, sendo get{nome_do_registro}. Esse nome do registro foi adicionado lá no model:
    /*
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',
        scope: { status: 'matriculado'},
        as: 'aulasMatriculadas'
      });
    */
    return listaMatriculas;
  }

  async pegaPessoasEscopoTodos(){
    return await super.pegaRegistrosPorEscopo('todosOsRegistros');
  }

  async pegaTodasAsMatriculasPorEstudante(id){
    const estudante = await super.pegaUmRegistroPorId(id);
    const listaMatriculas = await estudante.getTodasAsMatriculas();
    return listaMatriculas;
  }

  async cancelaPessoaEMatricula(estudanteId){
    return dataSource.Sequelize.Transaction(async (transacao) => {
      await super.atualizaRegistro({ ativo: false }, {id: estudanteId}, transacao);
      await this.matriculaServices.atualizaRegistro({status: 'cancelado'}, { estudante_id: estudanteId}, transacao);
      
      
    });
  }
}

module.exports = PessoaServices;