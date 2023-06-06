const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const allowedCors = [
  'http://api.mesto.govard.nomoredomains.rocks',
  'https://api.mesto.govard.nomoredomains.rocks',
  'https://mesto.govard.nomoredomains.rocks',
  'http://mesto.govard.nomoredomains.rocks',
  'localhost:3000',
  'http://localhost',
  'http://localhost:3001',
  'http://localhost:3000',
];

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};

const app = express();

const handleErrors = require('./middlewares/handleErrors');

app.use(helmet());

app.use(express.json());
app.use(requestLogger); // логгер запросов
app.use(cors(corsOptions));
app.use(router);
app.use(errorLogger); // логгер ошибок

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to database.');
}).catch((error) => {
  console.error('Error connecting to database:', error);
});

app.use(errors()); // обработчик ошибок celebrate

app.use(handleErrors);

app.listen(3000, () => { console.log('Server started.'); });
