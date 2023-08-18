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

router
  .route('/')
  .get(auth, getAll)
  .post(auth, validateBody(addSchema), addTask);

router
  .route('/:id')
  .patch(auth, isValidId, validateBody(updateSchema), updateTask)
  .delete(auth, isValidId, removeTask);

module.exports = router;
