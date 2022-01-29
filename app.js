const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// Connect to database
const connectToDb = mysql.createConnection({
  host: "localhost",
  // Your MySQL username,
  user: "root",
  // Your MySQL password
  password: "",
  database: "employee_DB",
},
console.log('connected to employee_DB')
);
menu();

// starting menu prompt

function menu() {
  inquirer
    .prompt({
      type: "list",
      name: "choice",
      message: "What would ou like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Departments",
        "Add Department",
        "View All Roles",
        "Add Role",
        "Quit",
      ],
    })
    .then(function (data) {
      if (data.choice === "View All Employees") {
        viewAllEmployees();
      } else if (data.choice === "Add Employee") {
        addEmployees();
      } else if (data.choice === "Update Employee Role") {
        updateEmployeeRole();
      } else if (data.choice === "View All Departments") {
        viewAllDepartments();
      } else if (data.choice === "Add Department") {
        addDepartment();
      } else if (data.choice === "View All Roles") {
        viewAllRoles();
      } else if (data.choice === "Add Role") {
        addRole();
      } else if (data.choice === "Quit") {
        console.log("Goodbye!");
      }
    });
}

//view all departments
const viewAllDepartments = () => {
  connectToDb.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    menu();
  });
};

//view all roles viewAllRoles
const viewAllRoles = () => {
  connectToDb.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    menu();
  });
};

//view all employees viewAllEmployees
const viewAllEmployees = () => {
  connectToDb.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    menu();
  });
};
//add a department addDepartment
const addDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      name: "dept",
      message: "Which department would you like to add?",
    })
    .then(function (data) {
      connectToDb.query(
        "INSERT INTO department SET ?",
        {
          name: data.dept,
        },
        function (err, res) {
          if (err) throw err;
          console.log("New department added");
          menu();
        }
      );
    });
};

//add a role addRole

//add an employee addEmployee

//update employee role  updateEmployeeRole
