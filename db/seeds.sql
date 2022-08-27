INSERT INTO departments (department)
VALUES
('R&D'),
('Aeronautics'), 
('Security'),
('Medical');

INSERT INTO jobs (job_title, dep_id_job, salary)
VALUES
('Manager', 1, 300000),
('Supervisor', 1, 250000),
('Entry', 1, 175000),
('Manager', 2, 200000),
('Supervisor', 2, 180000),
('Entry', 2, 150000),
('Manager', 3, 100000),
('Supervisor', 3, 80000),
('Entry', 3, 70000),
('Manager', 4, 290000),
('Supervisor', 4, 240000),
('Entry', 4, 177000);

INSERT INTO employee (first_name, last_name, dep_id, job_id)
VALUES
('Bruce', 'Wayne', 1, 1),
('Richard', 'Greyson', 2, 6),
('Jason', 'Todd', 2,12),
('Barbara', 'Gordon', 3, 10),
('Harleen', 'Quinzel', 4,9),
('Tim', 'Drake', 3,3),
('Hugo', 'Strange', 4, 5),
('Victor', 'Zsasz', 4, 11),
('Damien', 'Wayne', 1, 2);
