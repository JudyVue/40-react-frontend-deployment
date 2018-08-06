'use strict';

const express = require('express');
require('dotenv').config();

const app = express();

const build = `${__dirname}/build`;

app.use(express.static(build));

// all the routes will be handled by the frontend
app.get('*', (request, response) => {
  response.sendFile(`${build}/index.html`);
});

app.listen(process.env.PORT, () => {
  console.log('__SERVER_UP__', process.env.PORT);
});
