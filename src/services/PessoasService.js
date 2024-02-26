const Services = require('./Services.js');

class PessoaServices extends Services {
  constructor(){
    super('Pessoa');
  }

  async pegaMatriculasPorEstudante(id){
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
}

module.exports = PessoaServices;