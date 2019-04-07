'use strict';

var SwaggerExpress = require('swagger-express-mw');
const mongoose = require("mongoose");
var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }
  var port = process.env.PORT || 10010;
  // install middleware
  swaggerExpress.register(app);
  mongoose.connect("mongodb://localhost:27017/myproject", {
    useNewUrlParser: true
  }, function (err) {
    if (err) return console.log(err);
    app.listen(port);
  });


  // if (swaggerExpress.runner.swagger.paths['/api/hello', '/api/products']) {

  // }
});