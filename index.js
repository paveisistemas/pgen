#!/usr/bin/env node


/**
 * Created by PAVEI on 05/01/2015.
 */


var program = require('commander');
var fs = require('fs');
var swig = require('swig');
var pluralize = require('pluralize');



var S = require('string');


var path = require('path');

swig.setFilter('underscore', function(value){
  console.log(value.toString())
  return S(value.toString()).underscore().s;
})



swig.setFilter('pluralize', function(value){
  return pluralize(value.toString());
})

swig.setFilter('camelize', function(value){
  return S(value.toString()).camelize().s;
})


swig.setFilter('capitalize', function(value){
  return S(value.toString()).capitalize().s;
})


swig.setFilter('firstUp', function(value){
  var valueToS = value.toString();

  return valueToS.charAt(0).toUpperCase() + valueToS.slice(1);
})

function Model(modelName) {
  if (modelName) {
    this.modelName = modelName;
    this.modelNamePlural = pluralize(modelName)
  }
};

Model.prototype = {
  getModelName: function () {
      return this.modelName;
  },

  getControllerName: function(){
    return pluralize(this.modelName);
  },

  setArgs: function(args){
    var array = new Array();

    for (var i = 0; i < args.length; i++) {
      var arg = args[i];
      var split = arg.split(':')
      var obj = {name: split[0], type: split[1]}
      array.push(obj)

    }
    this.args =  array;
  }


}


// Compile a file and store it, rendering it later
var modelTpl = swig.compileFile(__dirname + "/model.template");
var controllerTpl = swig.compileFile(__dirname + '/controller.template');
var routesTpl = swig.compileFile(__dirname + '/routes.template');



program
  .version('0.0.1')
  .usage('g Car name:String price:BigDecimal')
  .option('g, --generator <ModelName> <values>', 'Generate Model, Controller and add to routes. in package app.model app.controller and conf/routes. ModelName shoud be the class name in camel case like: Car, User. ')
  .option('d, --destroy <ModelName>', 'Remove classes Model and Controller ')
  .parse(process.argv);


if (program.generator) {

  var model = new Model(program.generator);
  model.setArgs(program.args);


  fs.writeFile('./app/models/'+model.getModelName()+ '.java', modelTpl( model ), function (err) {

    if (err) throw err;

    console.log(model.getModelName()+ '.java'+  ' Model successfully generated');

  });

  fs.writeFile('./app/controllers/'+model.getControllerName() + '.java', controllerTpl(( model )), function (err) {

    if (err) throw err;

    console.log(model.getControllerName()+ '.java'+ '  Controller successfully generated');

  });




  fs.appendFile('./conf/routes', routesTpl(model), function (err) {

    if (err) throw err;

    console.log('Route has been added successfully');

  });


} else if (program.destroy) {

  var model = new Model(program.destroy);
  //
  fs.unlinkSync('./app/models/'+model.getModelName()+ '.java',  function (err) {

    if (err) throw err;

    console.log(model.getControllerName()+ '.java'+ '  Model successfully removed');

  });
  fs.unlinkSync('./app/controllers/'+model.getControllerName() + '.java',   function (err) {

    if (err) throw err;

    console.log(model.getControllerName()+ '.java'+ 'Controller successfully removed');

  });

}
