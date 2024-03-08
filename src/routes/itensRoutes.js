const express = require('express');
const itensController = require('../controller/itensController');


const router = express.Router();

router.post('/add', itensController.add);
router.get('/view/:id', itensController.get);
router.get('/list/:id', itensController.list);
router.put('/edit/:id', itensController.edit);
router.delete('/delete/:id', itensController.delete);

module.exports = router;
