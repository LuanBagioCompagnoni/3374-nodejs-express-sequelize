const Controller = require('./Controller.js');
const PessoasServices = require('../services/PessoasService.js');

const pessoaServices = new PessoasServices();

class PessoaController extends Controller{
  constructor(){
    super(pessoaServices);
  }
}
module.exports = PessoaController;