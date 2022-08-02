-- 1) Show all depts. [Names, IDs]
SELECT department.department_name AS "Department", department.id AS "Dept ID"
FROM department;
-- 2) Show all roles. [Title, role, dept, salary]
SELECT rl.title AS "Title", rl.id AS "Role ID", dpt.department_name AS "Department", rl.salary AS "Salary"
FROM company_role AS rl
LEFT JOIN department AS dpt ON rl.department_id = dpt.id;
-- 3) View All Employees [IDs, First Name, Last Name, Title, dept, salary, manager]
SELECT emp.id AS "ID", emp.first_name AS "First Name", emp.last_name AS "Last Name",  rl.title AS "Title", dpt.department_name AS "Department", rl.salary AS "Salary", CONCAT(mng.first_name, " ", mng.last_name) as "Manager"
FROM employee AS emp
LEFT JOIN employee AS mng ON emp.manager_id = mng.id
INNER JOIN company_role AS rl ON emp.role_id = rl.id
INNER JOIN department AS dpt ON rl.department_id = dpt.id WHERE dpt.id = department_id;
-- 4) Add a department [DONE]
INSERT INTO department (department_name)
VALUES ("Legal Department");
-- 5) Add a role [DONE]
INSERT INTO company_role (title, salary, department_id)
VALUES ("Lawyer", 200000, 5);
-- 6) Add an employee [DONE]
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ivan", "Smirnov", 9, null);
-- 7) Update an employee role[DONE]
UPDATE employee
SET employee.role_id = 8
WHERE employee.id = 11;
-- --------------------
SELECT employee.id, employee.first_name, employee.last_name, company_role.id AS "Role ID"
FROM employee, company_role, department WHERE department.id = company_role.department_id AND company_role.id = employee.role_id;

SELECT CONCAT(employee.first_name, " ", employee.last_name) AS "Employee"
FROM employee;

SELECT employee.id, employee.first_name, employee.last_name FROM employee








