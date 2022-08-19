const mysql = require('mysql2');
const express = require('express');

const inputCheck = require('./utils/inputCheck');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'new-password',
        database: 'mycompany',
    },
    console.log('Connected to the mycompany database')
);


 app.get('/api/employee/', (req, res) => {
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
 });



 app.post('/api/employee', ({body}, res) => {

    const errors = inputCheck(body, 'first_name', 'last_name', 'department', 'job_title');

    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO employee (first_name, last_name, department, job_title)
    
                VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.department, body.job_title];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message});
            return;
        }

        res.json({
            message: 'success',
            data: body
        });
    });

});



 
app.delete('/api/employee/:id', (req, res) => {
    const sql = `DELETE FROM employee WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message});
        } else if (!result.affectedRows) {
            res.json({
                message: 'employee not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

app.use((req, res) => {
    res.status(404).end();
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});