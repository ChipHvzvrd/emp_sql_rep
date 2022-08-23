//const fs = require('fs');
const mysql = require('mysql2');
const inquirer = require('inquirer');


const promptDatabase = addData => {

}

const promptUser = async () => {
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'add employee',
            message: 'Are you adding an employee?',
            default: false
        },
        {
            type: 'input',
            name:'first_name',
            message:'Input first name:',

        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Input last name:'
        },
        {
            type: 'checkbox',
            name: 'department',
            message: 'What department?',
            choices: ['R&D', 'Medical', 'Security', 'Aeronautics']
        },
        {
            type: 'checkbox',
            name: 'job_title',
            message: 'What is thier job title?',
            choices: ['Manager', 'Supervisor', 'Entry']
        },
    ]);
};

var sqldata = "INSERT INTO employee (first_name, last_name, department, job_title, loc_id)";

 promptUser().then(answers => {
     mysql.query(sqldata, [answers], function(err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
     });
 });