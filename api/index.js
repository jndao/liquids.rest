// Express modules
const express = require('express'),
  cors = require('cors'),
  rateLimit = require('express-rate-limit');

require('dotenv').config();

const dataHandler = require('./data');

const app = express();
const port = process.env.port || 4000;

/**
 * Detect data files prior to index deploy
 * Simply opens all the json data files needed for types
 * So that node can autodetect prior to starting
 */
const fs = require('fs');
const path = require('path')
const jsonsInDir = fs.readdirSync(path.join(__dirname, 'data')).filter(file => path.extname(file) === '.json');

jsonsInDir.forEach(file => {
  const fileData = fs.readFileSync(path.join(__dirname, 'data', file));
});

// APP SETUP
app.use(cors());

// Setup rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter);

app.get('/', (req, res) => {
  const type = req.query.type && req.query.type.toLowerCase();
  
  if (dataHandler[type] && type) {
    res.status(200).send({
      // Selects random item from data type to return
      data: dataHandler[type][Math.floor(Math.random()*dataHandler[type].length)],
    });
  } else if (!type) {
    res.status(200).send({
      types: dataHandler.getDataTypes(),
      message: 'Type not provided. Please specify a type from types.'
    })
  } else {
    res.status(400).send({
      message: "Type does not exist. Please enter a valid type."
    });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})