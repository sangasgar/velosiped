/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const hbs = require('hbs');
const path = require('path');
const async = require('hbs/lib/async');
const bcrypt = require('bcrypt');
const db = require('./db/models');

const PORT = process.env.PORT ?? 3000;

const app = express();
const indexRouter = require('./routers/indexRouter');
const postsRouter = require('./routers/postsRouter');
const usersRouter = require('./routers/usersRouter');

app.set('view engine', 'hbs');

app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function testBd() {
  try {
    await db.sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testBd();

app.use('/', indexRouter);

app.use('post/', postsRouter);

app.use('user/', usersRouter);
app.listen(PORT, () => {
  console.log('server start on ', PORT, '...');
});
