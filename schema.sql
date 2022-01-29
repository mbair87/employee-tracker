--
DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;
USE employee_DB;

DROP TABLE IF EXISTS department;
-- department table
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);
DROP TABLE IF EXISTS role;
-- role table
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2),
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

-- employee table
DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    CONSTRAINT FK_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
    manager_id INTEGER,
    CONSTRAINT FK_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);