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

// function sqlquery() {
//     db.query("SELECT FROM  employee", function(error) {
//         if (error) throw error;
//         console.log("results", results);
//         connection.end()
//     })
// };

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
            type: 'checkbox',
            name: 'department',
            message: 'What department?',
            choices: ['R&D', 'Medical', 'Security', 'Aeronautics'],
            when: (answers) => answers.selection === 'add employee'
        },
        {
            type: 'checkbox',
            name: 'job_title',
            message: 'What is thier job title?',
            choices: ['Manager', 'Supervisor', 'Entry'],
            when: (answers) => answers.selection === 'add employee'
        },
        {
            type: 'input',
            name: 'rm_first_name',
            message: 'Employee first name:',
            when: (answers) => answers.selection === 'remove employee'
        },
        {
            type: 'input',
            name: 'rm_last_name',
            message: 'Employee last name:',
            when: (answers) => answers.selection === 'remove employee'
        },
        {
            type: 'checkbox',
            name: 'rm_department',
            message: 'What department do they work for?',
            choices: ['R&D', 'Medical', 'Security', 'Aeronautics'],
            when: (answers) => answers.selection === 'remove employee'
        },
        {
            type: 'checkbox',
            name: 'rm_job_title',
            message: 'What is thier job title?',
            choices: ['Manager', 'Supervisor', 'Entry'],
            when: (answers) => answers.selection === 'remove employee'
        },
        {
            type: 'list',
            name: 'type_query',
            message: 'Search by:',
            choices: ['first name', 'last name', 'department', 'job title'],
            when: (answers) => answers.selection === 'search for employee'
        },
        {
            type: 'input',
            name: 'name_query',
            message: 'Type employee first name:',
            when: (answers) => answers.type_query === 'first name'
        },
        {
            type: 'input',
            name: 'surname_query',
            message: 'Type employee last name:',
            when: (answers) => answers.type_query === 'last name'
        },
        {
            type: 'checkbox',
            name: 'dep_query',
            message: 'What department do they work for?',
            choices: ['R&D', 'Medical', 'Security', 'Aeronautics'],
            when: (answers) => answers.type_query === 'department'
        },
        {
            type: 'checkbox',
            name: 'job_query',
            message: 'What is thier job title?',
            choices: ['Manager', 'Supervisor', 'Entry'],
            when: (answers) => answers.type_query === 'job title'
        }
    ]);
};

promptUser().then(answers => {
    console.log(answers);
    if (answers.selection === 'add employee'){
        db.query("INSERT INTO employee SET ?", {
        first_name: answers.first_name,
        last_name: answers.last_name,
        department: answers.department,
        job_title: answers.job_title
        });
        console.log("successfully added employee to database");
    }
    else if (answers.selection === 'view departments') {
        db.query("SELECT DISTINCT department FROM employee", function (err, result) {
            if (err) throw err;
            console.log(result);
            process.exit();
        })
    }
    else if (answers.selection === 'view all job titles') {
        db.query("SELECT DISTINCT job_title FROM employee", function (err, result) {
            if (err) throw err;
            console.log(result);
            process.exit();
        })
    }
    else if (answers.selection === 'view all employees') {
        db.query("SELECT * FROM employee", function (err, result) {
            if (err) throw err;
            console.log(result);
            process.exit();
        })
    }
    // else if (answers.selection === 'remove employee'){
    //     db.query("DELETE FROM employee WHERE ?", {
    //     first_name: answers.rm_first_name,
    //     last_name: answers.rm_last_name,
    //     department: answers.rm_department,
    //     job_title: answers.rm_job_title
    //     });
    // }
    // else if (answers.selection === 'search for employee'){
    //     if (answers.type_query === 'first name') {
    //         db.query("SELECT * FROM employee WHERE first_name = ?", {
    //             first_name: answers.name_query,
    //         });
    //         console.log()
    //     }
    //     else if (answers.type_query === 'last name') {
    //         db.query("SELECT * FROM employee WHERE last_name = ?", {
    //             last_name: answers.surname_query,
    //         });
    //     }
    //     else if (answers.type_query === 'department') {
    //         db.query("SELECT * FROM employee WHERE department = ?", {
    //             department: answers.dep_query,
    //         });
    //     }
    //     else if (answers.type_query === 'job title') {
    //         db.query("SELECT * FROM employee WHERE first_name = ?", {
    //             job_title: answers.job_query,
    //         });
    //     }
    // }
});
