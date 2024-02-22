const { Router } = require('express');
const MatriculaController = require('../controllers/MatriculaController.js');

const matriculaController = new MatriculaController();

const router = Router();

router.get('/matricula', (req, res) => matriculaController.listarTodos(req, res));
router.get('/matricula/:id', (req, res) => matriculaController.pegaUmPorId(req, res));
router.post('/matricula', (req, res) => matriculaController.criaNovo(req, res));
router.put('/matricula/:id', (req, res) => matriculaController.atualiza(req, res));
router.delete('/matricula/:id', (req, res) => matriculaController.exclui(req, res));

module.exports = router;