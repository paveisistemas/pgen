#pgen

Generate models and controllers and routes automatically scaffold for a CRUD using the Play Framework.

The base of the Rails generator to develop.

###Pre-requisites:

 - Application using Play Framework Built
 - Your packages must be app /models app / controllers conf / routes

###How to use:

- Install the node JS
- Open the command line and type: npm install -g PGEN

Go to the root folder of your project in Play exemple:

```sh
$ c:\project\playproject>
```

```sh
$ c:\project\playproject> pgen g Car name:String price:BigDecimal
```
2 classes will be generated:

- Car.java - Class model with annotations Ebean
- Cars.java - controller class that has methods in the rest pattern: all, save, list, update, delete

Will change the routes file to add all routes as the controller.


  Usage: 

     pgen -help:

     -h, --help output usage information
     -V, --version Output the version number
     g, --generator <ModelName> <values> Generate Model, Controller and add to routes. in package app.model app.controller and conf / routes. ModelName shoud be the class name in camel case like: Car, User.
     d, --destroy <ModelName> Remove Class Model and Controller
