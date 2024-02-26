const isValido = require('../../utils/validaCpfHelper.js');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      Pessoa.hasMany(models.Curso, {
        foreignKey: 'docente_id'
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',
        //scope: { status: 'matriculado'},
        as: 'aulasMatriculadas'
      });
    }
  }
  Pessoa.init({
    nome: {
      type:DataTypes.STRING,
      validate: {
        len: {
          args: [3, 30],
          msg: 'o campo nome deve ter no minimo 3 e no maximo 30 caracteres'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'formato do e-mail invalido'
        }
      }
    },
    cpf: {
      type: DataTypes.STRING,
      validate: {
        cpfEhValido: (cpf) => {
          if(!isValido(cpf)) throw new Error('numero de cpf invalido');
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas',
    defaultScope: {
      where: {
        ativo: true
      }
    },
    scopes: {
      todosOsRegistros:{
        where: {}
      }
    }
  });
  return Pessoa;
};