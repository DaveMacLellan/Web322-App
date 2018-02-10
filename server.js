/*********************************************************************************
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Dave MacLellan Student ID: 134463165 Date: 02/08/18
*
* Online (Heroku) Link: https://mysterious-thicket-30317.herokuapp.com/
*
********************************************************************************/ 

var express = require("express");
var app = express();
var path = require("path");
var data = require("./data-service.js")

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart(){
    console.log("Express http server listening on port: " + HTTP_PORT);
}

app.use(express.static('public'));

app.get("/", function(req, res){
    //res.send("Home");
    res.sendFile(path.join(__dirname + "/views/home.html"));
});

app.get("/about", function(req, res){
    //res.send("About");
    res.sendFile(path.join(__dirname + "/views/about.html"));
});

app.get("/employees", function(req, res){
    //res.send("Employees");
    data.getAllEmployees()
    .then(function(data){
        res.json(data);
    })
    .catch(function(err){
        res.send(err);
    })
});

app.get("/managers", function(req, res){
    //res.send("Managers");
    data.getManagers()
    .then(function(data){
        res.json(data);
    })
    .catch(function(err){
        res.send(err);
    })
});

app.get("/departments", function(req, res){
    //res.send("Departments");
    data.getDepartments()
    .then(function(data){
        res.json(data);
    })
    .catch(function(err){
        res.send(err);
    })
});

app.use(function (req, res, next){
    //res.status(404).send("error!");
    res.sendFile(path.join(__dirname + "/views/unknown.html"));
});

data.initialize()
.then(function(){
    app.listen(HTTP_PORT, onHttpStart)
})
.catch(function(err){
    console.log(err);
});