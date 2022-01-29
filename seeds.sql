INSERT INTO department (name)
VALUES ('Accounting'),
       ('Sales'),
       ('Human Resources'),
       ('Maintenance'),
       ('IT');

INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 75000, 1),
       ('Inside Sales Representative', 60000, 2),
       ('Director of Human Resources', 80000, 3),
       ('Maintenance Supervisor', 45000, 4),
       ('IT Support', 50000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Charles', 'Barkley', 1, NULL),
       ('Steve', 'Nash', 2, 1),
       ('Chris', 'Paul', 3, NULL),
       ('Devin', 'Booker', 4, 2),
       ('Mikal', 'Bridges', 5, 4);