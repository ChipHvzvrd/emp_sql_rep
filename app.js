//const fs = require('fs');
const mysql = require('mysql2');

const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'new-password',
        database: 'mycompany',
    },
    console.log('Connected to the mycompany database')
);

function sqlquery() {
    db.query("SELECT FROM  employee", function(error) {
        if (error) throw error;
        console.log("results", results);
        connection.end()
    })
};

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
promptUser().then(answers => {
    console.log(answers);
    db.query("INSERT INTO employee SET ?", {
        first_name: answers.first_name,
        last_name: answers.last_name,
        department: answers.department,
        job_title: answers.job_title
    }, function(error){
        if (error) throw error;
        console.log("Success: added employee to database");
        });
    });

//  promptUser().then(answers => {
//      mysql.query(sqldata, [answers], function(err, result) {
//         if (err) throw err;
//         console.log("Number of records inserted: " + result.affectedRows);
//      });
//  });