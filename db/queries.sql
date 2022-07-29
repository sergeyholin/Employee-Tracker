-- Show all employees. [DONE]
SELECT department.department_name AS Department, department.id AS ID
FROM department;
show tables;
-- Show all roles. [DONE]
SELECT company_role.title AS Title, employee.role_id AS Role ID, department.department_name AS Department, company_role.salary AS Salary
FROM company_role
INNER JOIN employee ON company_role.id=employee.id
INNER JOIN department ON employee.id = department.id;