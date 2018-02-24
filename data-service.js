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

module.exports.addEmployee = function(employeeData){
    return new Promise(function(resolve, reject){
        if(employeeData.isManager == null){
            employeeData.isManager = false;
            employeeData.employeeNum = employees.length + 1;
            employees.push(employeeData);
            resolve(employees);
        }else{
            employeeData.isManager = true;
            employeeData.employeeNum = employees.length + 1;
            employees.push(employeeData);
            resolve(employees);
        }
    });
}

module.exports.getEmployeesByStatus = function(status){
    return new Promise(function(resolve, reject){
        var statusEmployees = [];
        for(var i = 0; i < employees.length; i++){
            if(employees[i].status == status){
                statusEmployees.push(employees[i]);
                //console.log(employees[i].status);
            }
        }
        if(statusEmployees.length == 0){
            reject("Nothing found");
        }
        else{
            resolve(statusEmployees);
        }
    });
}

module.exports.getEmployeesByDepartment = function(department){
    return new Promise(function(resolve, reject){
        var departmentList = [];
        for(var i = 0; i < employees.length; i++){
            if(employees[i].department == department){
                departmentList.push(employees[i]);
            }
        }
        if(departmentList.length == 0){
            reject("Nothing found");
        }
        else{
            resolve(departmentList);            
        }
    });
}

module.exports.getEmployeesByManager = function(manager){
    return new Promise(function(resolve, reject){
        var managerList = [];
        for(var i = 0; i < employees.length; i++){
            if(employees[i].employeeManagerNum == manager){
                managerList.push(employees[i]);
            }
        }
        if(managerList.length == 0){
            reject("Nothing found");
        }
        else{
            resolve(managerList);
            
        }
    });
}

module.exports.getEmployeesByNum = function(num){
    return new Promise(function(resolve, reject){
        var employeeNumList = [];
        for(var i = 0; i < employees.length; i++){
            if(employees[i].employeeNum == num){
                employeeNumList.push(employees[i]);
            }
        }
        if(employeeNumList.length == 0){
            reject("Nothing found");
        }
        else{
            resolve(employeeNumList);            
        }
    });
}