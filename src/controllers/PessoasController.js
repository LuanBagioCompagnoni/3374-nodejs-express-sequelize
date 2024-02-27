const Controller = require('./Controller.js');
const PessoasServices = require('../services/PessoasService.js');

const pessoaServices = new PessoasServices();

class PessoaController extends Controller{
  constructor(){
    super(pessoaServices);
  }

  async pegaMatriculasAtivas(req, res){
    const { estudante_id } = req.params;
    try {
      const listaMatriculas = await pessoaServices.pegaMatriculasAtivasPorEstudante(Number(estudante_id));
      return res.status(200).json(listaMatriculas);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message});
    }
  }

  async pegaTodasAsPessoas(req,res){
    try {
      const lista = await pessoaServices.pegaPessoasEscopoTodos();
      return res.status(200).json(lista);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message});
    }
  }

  async pegaTodasAsMatriculas(req, res){
    const { estudante_id } = req.params;
    try {
      const listaMatriculas = await pessoaServices.pegaTodasAsMatriculasPorEstudante(Number(estudante_id));
      return res.status(200).json(listaMatriculas);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message});
    }
  }
}
module.exports = PessoaController;