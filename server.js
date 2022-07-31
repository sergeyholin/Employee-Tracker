// const connection = require('./config/connection');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// Connect to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'unicornco_db'
  },
  console.log(`Connected to the unicornCo_db database.`)
);

connection.connect((error) => {
  if (error) throw error;
  mainPrompt();
});

// mainPrompt();

// Main Prompt
function mainPrompt() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'choices',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
      }
    ])
    .then((data) => {
      console.log(data)

      if (`${data.choices}` === 'View all departments') {
        viewAllDepartments();
      } else if (`${data.choices}` === 'View all roles') {
        viewAllRoles();
      } else if (`${data.choices}` === 'View all employees') {
        viewAllEmployees();
      } if (`${data.choices}` === 'Add a department') {
        addDepartment();
      } else if (`${data.choices}` === 'Add a role') {
        addNewRole();
      } else if (`${data.choices}` === 'Add an employee') {
        addNewEmployee();
      } else if (`${data.choices}` === 'Update an employee role') {
        updateEmployeeRole();
      } else {
        // connection.end();
        return mainPrompt();
      }
    });     
};
// View all departments----------------------------------------------------------------------------
function viewAllDepartments() {
let sql = `SELECT department.department_name AS "Department", department.id AS "Dept. ID"
FROM department`;
connection.promise().query(sql, (error, response) => {
  if (error) throw error;
  console.table(response);
  mainPrompt();
});
};
// View all roles------------------------------------------------------------------------------------
function viewAllRoles() {
let sql = `SELECT company_role.title AS "Title", employee.role_id AS "Role ID", department.department_name AS "Department", company_role.salary AS "Salary"
FROM company_role
INNER JOIN employee ON company_role.id=employee.id
INNER JOIN department ON employee.id = department.id`;
  connection.promise().query(sql, (error, response) => {
    if (error) throw error;
    console.table(response);
    mainPrompt();
});
};
// View all employess--------------------------------------------------------------------------------
function viewAllEmployees() {
  let sql = `SELECT emp.id AS "ID", emp.first_name AS "First Name", emp.last_name AS "Last Name",  rl.title AS "Title", dpt.department_name AS "Department", rl.salary AS "Salary", CONCAT(mng.first_name, ' ', mng.last_name) as 'Manager' FROM employee AS emp LEFT JOIN employee AS mng ON emp.manager_id = mng.id INNER JOIN company_role AS rl ON emp.role_id = rl.id INNER JOIN department AS dpt ON rl.department_id = dpt.id WHERE dpt.id = department_id;`;
  connection.promise().query(sql, (error, response) => {
    if (error) throw error;
    console.table(response);
    mainPrompt();
  });
  };
// Add dept--------------------------------------------------------------------------------------------
function addDepartment() {
inquirer
.prompt([
  {
  type: 'input',
  message: 'What is the name of new department?',
  name: 'newDepartment',
  }
])
.then((data) => {
console.log(data)
let sql = `INSERT INTO department (department_name) VALUES (?)`;
connection.promise().query(sql, data.newDepartment, (error, response) => {
  if (error) throw error;
  console.table(response);
  viewAllDepartments();
});
});     
};
// Add role ???????????????????????????????????????????????????????????????????????????????
function addNewRole() {
// viewAllDepartments();
inquirer
.prompt([
  {
  type: 'input',
  message: 'What is the name of new company role?',
  name: 'newRole',
  },
  {
  type: 'input',
  message: 'What is the salary for the new company role?',
  name: 'newSalary',
  },
  {
  type: 'input',
  message: 'What is department ID for the new company role?',
  name: 'newDepartmentId',
  },

])
.then((data) => {
console.log(data)
let sql = `INSERT INTO company_role (title, salary, department_id) VALUES (?, ?, ?)`;
let test = [data.newRole, data.newSalary, data.newDepartmentId];
connection.promise().query(sql, test, (error, response) => {
  if (error) throw error;
  console.table(response);
  return mainPrompt();
});
});     
};
// ADD EMPLOYEE????????????????????????????????????????????????????????????????????????????????
function addNewEmployee() {
  inquirer
  .prompt([
    {
    type: 'input',
    message: 'What is employees first name?',
    name: 'firstName',
    },
    {
    type: 'input',
    message: 'What is employees last name?',
    name: 'lastName',
    },
    {
    type: 'input',
    message: 'What is employees new role?',
    name: 'newRole',
    },
    {
    type: 'input',
    message: 'Who is the managers ID for this employee?',
    name: 'newManagerId',
    },
  
  ])
  .then((data) => {
  console.log(data)
  let sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES (?, ?, ?, ?)`;
  let test = [data.firstName, data.lastName, data.newRole, data.newManagerId];
  connection.promise().query(sql, test, (error, response) => {
    if (error) throw error;
    console.table(response);
    return mainPrompt();
  });
  });     
};
// UPDATE EMPLOYEE ROLE????????????????????????????????????????????????????????????????????????????????
function updateEmployeeRole() {
  inquirer
  .prompt([
    {
    type: 'input',
    message: 'What is employees new role id?',
    name: 'RoleId',
    },
    {
    type: 'input',
    message: 'What is employees ID?',
    name: 'employeeId',
    },
  ])
  .then((data) => {
  console.log(data)
  let sql = `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
  let test = [data.roleId, data.employeeId];
  connection.promise().query(sql, test, (error, response) => {
    if (error) throw error;
    console.table(response);
    return mainPrompt();
  });
  });     
};

  