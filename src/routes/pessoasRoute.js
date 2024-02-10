const { Router } = require('express');
const PessoaControler = require('../controllers/PessoasControler.js');

const router = Router();

router.get('/pessoas', PessoaControler.listar);

module.exports = router;