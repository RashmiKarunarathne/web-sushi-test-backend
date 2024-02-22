const express = require('express')
const todoController = require('../controllers/todo')
const router = express.Router();
router.get('/', todoController.findAll);
router.post('/', todoController.create);
router.put('/:id', todoController.update);
router.delete('/:id', todoController.destroy);
module.exports = router