const Controller = require('./Controller.js');
const PessoasServices = require('../services/PessoasService.js');

const pessoaServices = new PessoasServices();

class PessoaController extends Controller{
  constructor(){
    super(pessoaServices);
  }

  async pegaMatriculas(req, res){
    const { estudanteId } = req.params;
    try {
      const listaMatriculas = await pessoaServices.pegaMatriculasPorEstudante(Number(estudanteId));
      return res.status(200).json(listaMatriculas);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message});
    }
  }
}
module.exports = PessoaController;