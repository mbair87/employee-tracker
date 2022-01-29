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
console.log('connected to employee_db')
);
connectToDb.connect(function (err){
if(err) throw err

startPrompts();

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
const addRole = () => {
    inquirer.prompt([{
        type: "input",
        name: "title",
        message: "What role would you like to add?"


    },{
        type: "input", 
        name: "salary",
        message: "What is the salary for the role?"
    
    }, {
        type: "list",
        name: "department_id", 
        message: "What is the department ID that this new role will belong to?",
        choices: ["1", "2", "3", "4", "5"]

    }]
    ).then(function (data){
        
        connectToDb.query('INSERT INTO role SET ?', {
            title: data.title,
            salary: data.salary,
            department_id: data.department_id
        },
        function (err, res) {if (err) throw err
        console.log("New Role Added")
        menu()
    }
        )
})}
//add an employee addEmployee

//update employee role  updateEmployeeRole
