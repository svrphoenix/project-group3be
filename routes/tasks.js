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

const { validateBody, isValidId, auth } = require('../middlewares');

const router = express.Router();

router.get('/', auth, getAll);

router.post('/', auth, validateBody(addSchema), addTask);

router.patch('/:id', auth, isValidId, validateBody(updateSchema), updateTask);

router.delete('/:id', auth, isValidId, removeTask);

module.exports = router;
