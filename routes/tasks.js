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

router.route('/').all(auth).get(getAll).post(validateBody(addSchema), addTask);

router
  .route('/:id')
  .all(auth)
  .patch(isValidId, validateBody(updateSchema), updateTask)
  .delete(isValidId, removeTask);

module.exports = router;
