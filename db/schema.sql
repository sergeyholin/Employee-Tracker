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











