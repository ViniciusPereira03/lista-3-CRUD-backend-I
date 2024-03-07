const express = require('express');
const produtosController = require('../controller/produtosController');


const router = express.Router();

router.post('/add', produtosController.add);
router.get('/view/:id', produtosController.get);
router.get('/list', produtosController.list);
router.put('/edit/:id', produtosController.edit);
router.delete('/delete/:id', produtosController.delete);

module.exports = router;
