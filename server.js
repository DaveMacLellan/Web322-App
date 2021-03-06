/*********************************************************************************
* WEB322 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Dave MacLellan Student ID: 134463165 Date: 02/22/18
*
* Online (Heroku) Link: https://evening-eyrie-58844.herokuapp.com/
*
********************************************************************************/ 

var express = require("express");
var app = express();
var path = require("path");
var data = require("./data-service.js");
var multer = require("multer");
var fs = require("fs");
var bodyParser = require("body-parser");

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart(){
    console.log("Express http server listening on port: " + HTTP_PORT);
}

const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function (req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));

app.get("/", function(req, res){
    //res.send("Home");
    res.sendFile(path.join(__dirname + "/views/home.html"));
});

app.get("/about", function(req, res){
    //res.send("About");
    res.sendFile(path.join(__dirname + "/views/about.html"));
});

app.get("/employees/add", function(req,res){
    res.sendFile(path.join(__dirname + "/views/addEmployee.html"));
});

app.post("/employees/add", function(req, res){
    data.addEmployee(req.body)
    .then(function(data){
        res.redirect("/employees")
    })
    .catch(function(err){
        res.send(err);
    })
});

app.get("/employees", function(req, res){
    if(req.query.status){
        data.getEmployeesByStatus(req.query.status)
        .then(function(data){
            res.json(data);
        })
        .catch(function(err){
            res.send(err);
        })
    }
    else if(req.query.department){
        data.getEmployeesByDepartment(req.query.department)
        .then(function(data){
            res.json(data);
        })
        .catch(function(err){
            res.send(err);
        })
    }
    else if(req.query.manager){
        data.getEmployeesByManager(req.query.manager)
        .then(function(data){
            res.json(data);
        })
        .catch(function(err){
            res.send(err);
        })
    }
    else{
        data.getAllEmployees()
        .then(function(data){
            res.json(data);
        })
        .catch(function(err){
            res.send(err);
        })
    }    
});

app.get("/employees/:num", function(req, res){
    data.getEmployeesByNum(req.params.num)
    .then(function(data){
        res.json(data);
    })
    .catch(function(err){
        res.send(err);
    });
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

app.get("/images/add", function(req, res){
    res.sendFile(path.join(__dirname + "/views/addImage.html"));
});

app.post("/images/add", upload.single("imageFile"), function(req, res){
    res.redirect("/images");
})

app.get("/images", function(req, res){
    fs.readdir(__dirname + "/public/images/uploaded", function(err, images){
         res.json({images});
    });
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