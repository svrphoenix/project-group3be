const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

const reviewsRouter = require('./routes/reviews');
const taskRouter = require('./routes/tasks');

require('dotenv').config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const { authRouter } = require("./routes/auth");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/reviews', reviewsRouter);
app.use('/tasks', taskRouter);

app.use('/users', authRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Path not found' });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Internal server error' } = err;
  res.status(statusCode).json({ message });
});

module.exports = app;
