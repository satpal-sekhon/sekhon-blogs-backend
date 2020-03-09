const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const fileUpload = require('express-fileupload');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', '*');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*');
  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));


let apiRoutes = require("./routes")
app.use('/', apiRoutes)

app.listen(process.env.PORT || 5000);
console.log('Node started on port: 5000');