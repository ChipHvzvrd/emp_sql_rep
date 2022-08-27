CREATE TABLE departments (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
department VARCHAR(30) NOT NULL
);

CREATE TABLE jobs (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
job_title VARCHAR(30) NOT NULL,
dep_id_job INTEGER,
salary INTEGER(6),
FOREIGN KEY (dep_id_job)
REFERENCES departments(id)
ON DELETE SET NULL
);

CREATE TABLE employee (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
dep_id INTEGER,
job_id INTEGER,
FOREIGN KEY (dep_id)
REFERENCES departments(id)
ON DELETE SET NULL,
FOREIGN KEY (job_id)
REFERENCES jobs(id)
ON DELETE SET NULL

);

