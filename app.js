const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const e = require("express");

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
          message: "What role would you like to add?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary for the role?",
        },
        {
          type: "list",
          name: "department_id",
          message: "What department does this new role belong to?",
          choices: res.map((department) => department.name),
        },
      ])
      .then(function (data) {
        const departmentName = res.find(
          (department) => department.name === data.department_id
        );
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
    connectToDb.query("SELECT * FROM employee", function (err, employeeData) {
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
        message: "Who is this employee's manager?",
        choices: employeeData.map((employee) => employee.first_name + " " + employee.last_name)
        
      },
    ])
    .then(function (data) {
      const roleTitle = res.find((role) => role.title === data.role_id);
      let managerID 
      for (let i = 0; i < employeeData.length; i++) {
      
        if (employeeData[i].first_name + " " + employeeData[i].last_name === data.manager_name) {
          managerID = employeeData[i].id
        }
      }
      connectToDb.query(
        "INSERT INTO employee SET ?",
        {
          first_name: data.first_name,
          last_name: data.last_name,
          role_id: roleTitle.id,
          manager_id: managerID
        },
        function (err, res) {
          if (err) throw err;
          console.log("Added new employee");
          menu();
        }
      );
    });
});
  })
    
};

//update employee role  updateEmployeeRole

const updateEmployeeRole = () => {
  connectToDb.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeName",
          message: "Which employee's role would you like to update?",
          choices: res.map(
            (employee) => employee.first_name + " " + employee.last_name
          ),
        },
      ])
      .then(function (data) {
        const updatedEmployee = data.employeeName;
        connectToDb.query("SELECT * FROM role", function (err, res) {
          if (err) throw err;
          inquirer
            .prompt([
              {
                type: "list",
                name: "newRole_id",
                message: "What is the employee's new role?",
                choices: res.map((role) => role.title),
              },
            ])
            .then(function (data) {
              const updatedRole = res.find(
                (role) => role.title === data.newRole_id
              );
              const first_name = updatedEmployee.split(" ")[0];
              const last_name = updatedEmployee.split(" ")[1];
              connectToDb.query(
                "UPDATE employee SET ? WHERE first_name =" +
                  '"' +
                  first_name +
                  '"AND last_name=' + '"' + last_name + '"',
                {
                  role_id: updatedRole.id,
                },
                function (err, res) {
                  if (err) throw err;
                  console.log("Employee role updated.");
                  menu();
                }
              );
            });
        });
      });
  });
};
