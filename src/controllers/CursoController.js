const Controller = require('./Controller.js');
const CursoServices = require('../services/CursosService.js');
const Op = require('sequelize');

const cursoServices = new CursoServices();

class CursoController extends Controller{
  constructor(){
    super(cursoServices);
  }

  async pegaCursos(req, res){
    const { data_inicial, data_final} = req.query;
    const where = {};
    data_inicial || data_final ? where.data_inicio = {} : null;
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
    data_final ? where.data_inicio[Op.gte] = data_final : null;

    try {
      const lista = await cursoServices.listarTodosOsRegistros(where);
      return res.status(200).json(lista);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message});
    }
  }
}
module.exports = CursoController;