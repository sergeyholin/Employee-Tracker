DROP DATABASE IF EXISTS unicornCo_db;
CREATE DATABASE unicornCo_db;

USE unicornCo_db;
-- Table1
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);
-- Table2
CREATE TABLE company_role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);
-- Table3
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    FOREIGN KEY(manager_id)
    REFERENCES employee(id),
    FOREIGN KEY (role_id)
    REFERENCES company_role(id)
);
-- **************************************************************************************
department: 5) Department,

company_role: 4) Title, 6) Salary,

employee: 1)id, 2) First Name, 3) Last Name, 7) Managers

-- Select Rows that you need from tables. AS = Alias aka name that will show on temp table
-- So I have 4 rows from 3 tables: 1)Table2,2)Table3,3)Table1,4)Table2
-- Order matters, they will appear in the same orrder they are laid out on 1st line
SELECT company_role.title AS Title, employee.role_id AS Role_ID, department.department_name AS Department, company_role.salary AS Salary
-- From Table2
FROM company_role
-- JOIN Table3 ON Table2.id = Table3.id
INNER JOIN employee ON company_role.id=employee.id
-- JOIN Table1 ON Table3.id = Table1.id
INNER JOIN department ON employee.id = department.id;
-- *********************************************************************************************
SELECT employee.id, employee.first_name, employee.last_name, company_role.id AS "Role ID"
FROM employee, company_role, department WHERE department.id = company_role.department_id AND company_role.id = employee.role_id;

SELECT employee.first_name, employee.last_name
FROM employee











