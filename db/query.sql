SELECT 
employee.first_name AS first_name, 
employee.last_name AS last_name,
jobs.job_title AS job_title, 
jobs.salary AS salary,
departments.department AS department
FROM employee
JOIN jobs ON employee.job_id = jobs.id
JOIN departments ON employee.dep_id = departments.id;