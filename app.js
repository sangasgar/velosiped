require('dotenv').config();
const db = require('./db/models');
const express = require('express');
const morgan = require('morgan');
const hbs = require('hbs');
const path = require('path');
const async = require('hbs/lib/async');

const PORT = process.env.PORT ?? 3000;

const app = express();



app.set('view engine', 'hbs');

app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


async function testBd () {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testBd ()
app.listen(PORT, () => {
  console.log('server start on ', PORT, '...');
});
