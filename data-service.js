const fs = require('fs');

var employees = [];
var departments = [];

module.exports.initialize =  function(){
    return new Promise(function(resolve, reject){
        fs.readFile('./data/employees.json', (err, data) => {
            if(err){
                reject("Cannot read file employees.json");
            }
            else{
                employees = JSON.parse(data);
                fs.readFile('./data/departments.json', (err, data) => {
                    if(err){
                        reject("Cannot read file departments.json");
                    }
                    else{
                        departments = JSON.parse(data);
                        resolve("Files read successfully");
                    }                    
                });
            }
        });        
    });
}

module.exports.getAllEmployees =  function(){
    console.log("Employees");
    return new Promise(function(resolve, reject){
        if(employees.length == 0){
            reject("No employees found")
        }
        else{
            resolve(employees);
        }
    });
}

module.exports.getManagers =  function(){
    console.log("Managers");
    return new Promise(function(resolve, reject){
        var managerEmployees = [];
        for(var i = 0; i < employees.length; i++){
            if(employees[i].isManager == true){
                managerEmployees.push(employees[i]);
            }
        }

        if(managerEmployees.length == 0){
            reject("Nothing found");
        }
        else{
            resolve(managerEmployees);
        }
    });
}

module.exports.getDepartments =  function(){
    console.log("Departments");
    return new Promise(function(resolve, reject){
        if(departments.length == 0){
            reject("No departments found")
        }
        else{
            resolve(departments);
        }
    });
}