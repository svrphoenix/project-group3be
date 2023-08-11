const express = require('express');

const {
  getAll,
  addTask,
  updateTask,
  removeTask,
} = require('../controllers/tasksController');

const {
  addSchema,
  updateSchema,
} = require('../helpers/validation/tasksSchemas');

const { validateBody, isValidId } = require('../middlewares'); // authenticate

const router = express.Router();

router.get('/', getAll); // authenticate

router.post('/', validateBody(addSchema), addTask); // authenticate

router.patch('/:id', isValidId, validateBody(updateSchema), updateTask); // authenticate

router.delete('/:id', isValidId, removeTask); // authenticate

module.exports = router;
