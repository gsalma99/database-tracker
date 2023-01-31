const inquirer = require("inquirer");
const connection = require("./connection.js");

const menuquestion = {
  type: "list",
  message: "please choose what you want to view.",
  name: "answer",
  choices: [
    "departments",
    "roles",
    "employees",
    "add a department",
    "add a role",
    "add an employee",
    "update an employee role",
    "Quit"
  ],
};

function promptMenu() {
  inquirer.prompt(menuquestion).then(({answer}) => {
    console.log(answer);
    switch (answer) {
      case "departments":
        viewDepartments();
        break;
      case "roles":
        viewRoles();
        break;
      case "employees":
        viewEmployees();
        break;
      case "add a department":
        addDepartment();
        break;
      case "add a role":
        addRole();
        break;
      case "add an employee":
        addEmployee();
        break;
      case "update an employee role":
        updateEmployeeRole();
        break;
      default:
        quit();
    }
  });
}

async function viewDepartments() {
  const [departments] = await connection
    .promise()
    .query("SELECT * FROM department;");
  console.table(departments);
  promptMenu();
}

async function viewRoles() {
  const [roles] = await connection.promise().query("SELECT * FROM role;");
  console.table(roles);
  promptMenu();
}

async function viewEmployees() {
  const [employees] = await connection
  .promise()
  .query("SELECT * FROM employee;");
console.table(employees);
  promptMenu();
}

async function addDepartment() {
  const answer = await inquirer.prompt({
    type: "input",
    message: "what is the name of the department?",
    name: "deptName",
  });
  const result = await connection
    .promise()
    .query("INSERT INTO department (name) VALUES (?)", [answer.deptName]);
  console.table(result);
  promptMenu();
}

async function addRole() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      message: "what would you like the name of the role to be?",
      name: "roleName",
    },
    {
      type: "input",
      name: "salaryTotal",
      message: "how about the salary?",
    },
    {
      type: "input",
      name: "deptID",
      message: "lastly, give the new role a department id?"
    },
  ]);
  const result = await connection 
    .promise()
    .query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [
      answer.roleName,
      answer.salaryTotal,
      answer.deptID,
    ]);
  console.table(result);
  promptMenu();
}

async function addEmployee() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "FirstName",
      message: "what is the employee's first name?",
    },
    {
      type: "input",
      message: "what about the last name?",
      name: "LastName",
    },
    {
      type: "input",
      name: "roleID",
      message: "what is the person's role id number?",
    },
    {
      type: "input",
      name: "managerID",
      message: "what is the manager id?",
    },
  ]);
  const result = await connection 
    .promise()
    .query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", 
    [answer.FirstName, answer.LastName, answer.roleID, answer.managerID]
    );
  console.table(result);
  promptMenu();
}
async function updateEmployeeRole(){
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "employeeUpdate",
      message: "which employee would you like to update?"
    },
    {
      type: "input",
      message: "what do you want to update?",
      name: "updateRole"
    }
  ]);
  return new Promise((resolve, reject) => {
    connection.promise().query('UPDATE employee SET role_id=? WHERE first_name=?', [answer.updateRole, answer.employeeUpdate],function(err, res){
      if (err) reject(err);
      resolve(console.table(res));
    });
    promptMenu();
  });
}

promptMenu();

function quit() {
  connection.end();
  process.exit();
}
