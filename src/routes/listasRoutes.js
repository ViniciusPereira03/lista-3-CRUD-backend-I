const express = require('express');
const listasController = require('../controller/listasController');


const router = express.Router();

router.post('/add', listasController.add);
router.get('/view/:id', listasController.get);
router.get('/list', listasController.list);
router.put('/edit/:id', listasController.edit);
router.delete('/delete/:id', listasController.delete);

module.exports = router;
