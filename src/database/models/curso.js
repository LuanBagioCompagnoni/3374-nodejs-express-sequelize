'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    static associate(models) {
      Curso.belongsTo(models.Categoria, {
        //Curso.belongsTo: curso pertence a categoria, e uma categoria tem vários cursos
        foreignKey: 'categoria_id'
      });
      Curso.belongsTo(models.Pessoa, {
        //Curso.belongsTo: curso pertence a Pessoas, e uma categoria tem vários cursos
        //Basicamente um curso foi criado por uma pessoa
        foreignKey: 'docente_id'
      });
      Curso.hasMany(models.Matricula, {
        //relação 1 -> N ------- Um curso pode ter várias matriculas, mas uma matricula pode ter apenas um curso
        foreignKey: 'curso_id'
      });
    }
  }
  Curso.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    data_inicio: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Curso',
    tableName: 'cursos'
  });
  return Curso;
};