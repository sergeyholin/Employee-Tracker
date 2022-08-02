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
       return viewAllDepartments();
      } else if (`${data.choices}` === 'View all roles') {
       return viewAllRoles();
      } else if (`${data.choices}` === 'View all employees') {
        return viewAllEmployees();
      } if (`${data.choices}` === 'Add a department') {
        return addDepartment();
      } else if (`${data.choices}` === 'Add a role') {
        return addNewRole();
      } else if (`${data.choices}` === 'Add an employee') {
       return  addNewEmployee();
      } else if (`${data.choices}` === 'Update an employee role') {
        return updateEmployeeRole();
      } else {
       return connection.end();
        // return mainPrompt();
      }
    });     
};
// View all departments----------------------------------------------------------------------------
function viewAllDepartments() {
let sql = `SELECT department.department_name AS "Department", department.id AS "Dept. ID"
FROM department`;
connection.query(sql, (error, response) => {
  if (error) throw error;
  console.table(response);
  mainPrompt();
});
};
// View all roles------------------------------------------------------------------------------------
function viewAllRoles() {
let sql = `SELECT rl.title AS "Title", rl.id AS "Role ID", dpt.department_name AS "Department", rl.salary AS "Salary"
FROM company_role AS rl
LEFT JOIN department AS dpt ON rl.department_id = dpt.id`;
  connection.query(sql, (error, response) => {
    if (error) throw error;
    console.table(response);
    mainPrompt();
});
};
// View all employess--------------------------------------------------------------------------------
function viewAllEmployees() {
  let sql = `SELECT emp.id AS "ID", emp.first_name AS "First Name", emp.last_name AS "Last Name",  rl.title AS "Title", dpt.department_name AS "Department", rl.salary AS "Salary", CONCAT(mng.first_name, ' ', mng.last_name) as 'Manager' FROM employee AS emp LEFT JOIN employee AS mng ON emp.manager_id = mng.id INNER JOIN company_role AS rl ON emp.role_id = rl.id INNER JOIN department AS dpt ON rl.department_id = dpt.id WHERE dpt.id = department_id;`;
  connection.query(sql, (error, response) => {
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
connection.query(sql, data.newDepartment, (error, response) => {
  if (error) throw error;
  console.table(response);
  viewAllDepartments();
});
});     
};
// Add role-------------------------------------------------------------------------------------------------
function addNewRole() {
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
connection.query(sql, test, (error, response) => {
  if (error) throw error;
  console.table(response);
  // return mainPrompt();
  viewAllRoles();
});
});     
};
// ADD EMPLOYEE????????????????????????????????????????????????????????????????????????????????
const addNewEmployee = () => {
let sql = `SELECT * FROM employee`;
connection.query(sql, (error, response) => {
  if (error) throw error;
  let employeeArray = [];
  response.forEach((employee) => {employeeArray.push(`${employee.first_name} ${employee.last_name}`);});

  let sql = `SELECT * FROM company_role`;
  connection.query(sql, (error, response) => {
    if (error) throw error;
    let newRoleArray = [];
    response.forEach((company_role) => {newRoleArray.push(company_role.title);});

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
        type: 'list',
        message: 'What is employees new role?',
        name: 'role',
        choices: newRoleArray
        },
        {
        type: 'list',
        message: 'Who is the manager for this employee?',
        name: 'manager',
        choices: employeeArray
        },
      ])
      .then((data) => {
        console.log(data)
        let newTitleId, employeeId;

        response.forEach((company_role) => {
          if (data.role === company_role.title) {
            newTitleId = company_role.id;
          }
        });
// Why is employee id undefined???????????????????????????????????????????????????????
        response.forEach((employee) => {
          if (data.manager === `${employee.first_name} ${employee.last_name}`) {
            employeeId = employee.id;
          }
        });

        let sql2 = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`;
        let test = [data.firstName, data.lastName, newTitleId, employeeId];
        console.log(test);
        connection.query(sql2, test, (error) => {
            if (error) throw error;
            mainPrompt();
          }
        );
      });
  });
});
};
// UPDATE EMPLOYEE ROLE????????????????????????????????????????????????????????????????????????????????
const updateEmployeeRole = () => {
let sql = `SELECT employee.id, employee.first_name, employee.last_name FROM employee`;
connection.query(sql, (error, response) => {
  if (error) throw error;
  let employeeArray = [];
  response.forEach((employee) => {employeeArray.push(`${employee.first_name} ${employee.last_name}`);});

  let sql = `SELECT company_role.id, company_role.title FROM company_role`;
  connection.query(sql, (error, response) => {
    if (error) throw error;
    let newRoleArray = [];
    response.forEach((company_role) => {newRoleArray.push(company_role.title);});

    inquirer
      .prompt([
        {
          name: 'employee',
          type: 'list',
          message: 'Which employee has a new role?',
          choices: employeeArray
        },
        {
          name: 'role',
          type: 'list',
          message: 'What is employees new role?',
          choices: newRoleArray
        }
      ])
      .then((data) => {
        console.log(data)
        let newTitleId, employeeId;

        response.forEach((company_role) => {
          if (data.role === company_role.title) {
            newTitleId = company_role.id;
          }
        });
// Why is employee id undefined???????????????????????????????????????????????????????
        response.forEach((employee) => {
          if (data.employee === `${employee.first_name} ${employee.last_name}`) {
            employeeId = employee.id;
          }
        });

        let sql2 = `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
        let test = [newTitleId, employeeId];
        console.log(test);
        connection.query(sql2, test, (error) => {
            if (error) throw error;
            mainPrompt();
          }
        );
      });
  });
});
};

