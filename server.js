const mysql = require('mysql2');
const express = require('express');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Matrix2016!',
        database: 'mycompany',
    },
    console.log('Connected to the mycompany database')
);

// db.query(`DELETE FROM employee WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });
const sql = `INSERT INTO employee (id, first_name, last_name, department, job_title)
                 VALUES (?,?,?,?,?)`;
const params = [1, 'Bruce', 'Wayne', 'R&D', 'Entry'];

db.query(sql, params, (err, result) => {
     if (err){
         console.log(err);
     }
     console.log(result);
 });
// app.get('/', (req, res) => {
//     res.json({
//         message: "~Server is running~"
//     });
// });
// db.query(`SELECT * FROM employee WHERE id=1`, (err, row) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(row);
// });

app.use((req, res) => {
    res.status(404).end();
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});