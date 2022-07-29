DROP DATABASE IF EXISTS unicornCo_db;
CREATE DATABASE unicornCo_db;

USE unicornCo_db;
-- Table1
CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30)
);
-- Table2
CREATE TABLE company_role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);
-- Table3
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES company_role(id)
);

SELECT department.department_name AS Department, department.department_id AS ID
FROM department
show tables;



-- **************************************************************************************
company_role: 1) title, 3) department_id, 4) salary

employee: 2) role_id,

-- Select Rows that you need from tables. AS = Alias aka name that will show on temp table
-- So I have 4 rows from 3 tables: 1)Table2,2)Table3,3)Table1,4)Table2
SELECT company_role.title AS Title, employee.role_id AS Role_ID, department.department_name AS Department, company_role.salary AS Salary
-- From Table2
FROM company_role
-- JOIN Table3 ON Table2.id = Table3.id
INNER JOIN employee ON company_role.id=employee.id
-- JOIN Table1 ON Table3.id = Table1.id
INNER JOIN department ON employee.id = department.id;











