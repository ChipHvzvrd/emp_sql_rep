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

const promptUser = async () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'What would you like to do?',
            choices: ['view departments','view all job titles', 'view all employees', 'add employee', 'add department', 'add job', 'update employee job status']
        },
        {
            type: 'input',
            name:'first_name',
            message:'Input first name:',
            when: (answers) => answers.selection === 'add employee'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Input last name:',
            when: (answers) => answers.selection === 'add employee'
            
        },
        {
            type: 'list',
            name: 'department',
            message: 'What department?',
            choices: [
                {
                name:'R&D',
                value: 1,
                },
                {
                name:'Medical',
                value: 2,
                },
                {
                name: 'Security',
                value: 3,
                }, 
                {
                name:'Aeronautics',
                value: 4,
                }
            ],
            when: (answers) => answers.selection === 'add employee'
        },
            {
                type: 'list',
                name: 'job_title',
                message: 'What is thier job title?',
                choices: [
                {
                name:'Manager',
                value: 1,
                },
                {
                name:'Supervisor',
                value: 2,
                },
                { 
                name:'Entry',
                value: 3,
                }
                ],
                when: (answers) => answers.department === 1
                },
                {
                type: 'list',
                name: 'job_title',
                message: 'What is thier job title?',
                choices: [
                {
                name:'Manager',
                value: 4,
                },
                {
                name:'Supervisor',
                value: 5,
                },
                { 
                name:'Entry',
                value: 6,
                }
                ],
                when: (answers) => answers.department === 2
                },
                {
                type: 'list',
                name: 'job_title',
                message: 'What is thier job title?',
                choices: [
                {
                name:'Manager',
                value: 7,
                },
                {
                name:'Supervisor',
                value: 8,
                },
                { 
                name:'Entry',
                value: 9,
                }
                ],
                when: (answers) => answers.department === 3
                },
                {
                type: 'list',
                name: 'job_title',
                message: 'What is thier job title?',
                choices: [
                {
                name:'Manager',
                value: 10,
                },
                {
                name:'Supervisor',
                value:11,
                },
                { 
                name:'Entry',
                value: 12,
                }
                ],
                when: (answers) => answers.department === 4
                },
        {
            type: 'input',
            name: 'add_dep',
            message: 'What is the name of the department you would like to add?',
            when: (answers) => answers.selection === 'add department'
        }
    ]);
};

promptUser().then(answers => {
    console.log(answers);
    if (answers.selection === 'add employee'){
        db.query("INSERT INTO employee SET ?", {
        first_name: answers.first_name,
        last_name: answers.last_name,
        job_id: answers.job_title,
        dep_id: answers.department
        });
        console.log("successfully added employee to database");
        process.exit();
    }
    else if (answers.selection === 'add department'){
        db.query("INSERT INTO departments SET ?", {
            department: answers.add_dep
        });
        console.log("successfully added department to database");
        process.exit();
    }
    else if (answers.selection === 'view departments') {
        db.query("SELECT * FROM departments", function (err, result) {
            if (err) throw err;
            console.log(result);
            process.exit();
        })
    }
    else if (answers.selection === 'view all job titles') {
        db.query("SELECT jobs.job_title AS job_title, departments.department AS department, jobs.salary AS salary FROM jobs JOIN departments ON jobs.dep_id_job = departments.id", function (err, result) {
            if (err) throw err;
            console.log(result);
            process.exit();
        })
    }
    else if (answers.selection === 'view all employees') {
        db.query('SELECT employee.first_name AS first_name, employee.last_name AS last_name, jobs.job_title AS job_title, jobs.salary AS salary, departments.department AS department FROM employee JOIN jobs ON employee.job_id = jobs.id JOIN departments ON employee.dep_id = departments.id', function (err, result) {
            if (err) throw err;
            console.log(result);
            process.exit();
        })
    }
});


