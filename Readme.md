#pgen

Generate models, controllers and routes automatically for a CRUD using the Play Framework on Java.

It is based on the same idea of the *rails generator*.

###Pre-requisites:

 - Application using Play Framework Built
 - Your packages / folder structure must be:
   - `app/models` 
   - `app/controllers`
   - `conf/routes`

###How to use:

- Install the [nodeJS](http://nodejs.org/)
- Open the command line and type: `npm install -g pgen`
- On command line, go to the root folder of your project in Play:

```sh
$ c:\project\playproject>
```

- Use the command `pgen g` to generate the files:
```sh
$ c:\project\playproject> pgen g Car name:String price:BigDecimal
```
  It will be generated 2 classes: 
   - *app/models/Car.java* - model class with Ebean annotations
   - *app/controllers/Cars.java* - controller class that has methods in the REST pattern: all, save, list, update, delete
 
It will also change the *conf/routes* file to add all REST routes to the controller.


###Usage: 

     pgen -help:

     -h, --help output usage information
     -V, --version Output the version number
     g, --generator <ModelName> <values> Generate Model, Controller and add to routes. in package app.model app.controller and conf / routes. ModelName shoud be the class name in camel case like: Car, User.
     d, --destroy <ModelName> Remove Class Model and Controller
