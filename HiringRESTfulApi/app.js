const express = require ('express');
const app = express ();
require('dotenv/config');
const port = process.env.PORT;
const bodyParser = require ('body-parser');
const cors = require ('cors');
const routes = require ('./src/routes/routes');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use (
  bodyParser.urlencoded ({
    extended: true,
  })
);
app.use (bodyParser.json ());
app.use(cors());

routes (app);

app.listen (port);
console.log ('Started');