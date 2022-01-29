const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// Connect to database
const connectToDb = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "",
    database: "employee_DB",
  },
  console.log("connected to employee_db")
);
connectToDb.connect(function (err) {
  if (err) throw err;

  menu();
});

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
        addEmployee();
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
const addRole = () => {
  connectToDb.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
            type: "input",
            name: "title",
            message: "What role would you like to add?"
        },
        {
            type: "input", 
            name: "salary",
            message: "What is the salary for the role?"
        },
        {
          type: "list",
          name: "department_id",
          message: "What department does this new role belong to?",
          choices: res.map((department) => department.name),
        },
      ])
      .then(function (data) {
        const departmentName = res.find((department) => department.name === data.department_id);
        connectToDb.query(
          "INSERT INTO role SET ?",
          {
            title: data.title,
          salary: data.salary,
            department_id: departmentName.id,
          },
          function (err, res) {
            if (err) throw err;
            console.log("New role added");
            menu();
          }
        );
      });
  });
};
//add an employee addEmployee

const addEmployee = () => {
  connectToDb.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the employee's first name?",
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the employee's last name?",
        },
        {
          type: "list",
          name: "role_id",
          message: "What is the role of the new employee?",
          choices: res.map((role) => role.title),
        },
        {
          name: "manager_name",
          type: "list",
          message: "What is the ID of the employee's manager?",
        },
      ])
      .then(function (data) {
        const roleTitle = res.find((role) => role.title === data.role_id);
        connectToDb.query(
          "INSERT INTO employee SET ?",
          {
            first_name: data.first_name,
            last_name: data.last_name,
            role_id: roleTitle.id,
          },
          function (err, res) {
            if (err) throw err;
            console.log("Added new employee");
            menu();
          }
        );
      });
  });
};

//update employee role  updateEmployeeRole
