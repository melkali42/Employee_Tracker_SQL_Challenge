const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const startMenu = () => {
    inquirer.prompt({
        message: "What would you like to do?",
        name: "start",  
        type: "list",
        choices: [
            "View All Employees",
            "View All Departments",
            "View All Roles",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Update Employee Role",
            "Exit"
        ],
    })
    .then(response => {
        switch (response.menu) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Exit":
                connection.end();
                break;
        }
    });
};

const viewAllEmployees = () => {
    db.query(
        "SELECT employee.id, first_name, last_name, title, salary, dept_name, manager_id FROM ((department JOIN job ON department.id = job.department_id) JOIN employee ON job.id = employee.job_id)",
         function (err, res) {
        if (err) throw err;
        console.log(results);
        startMenu();
    });
};

const viewAllDepartments = () => {
    db.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.log(results);
        startMenu();
    });
};

const viewAllRoles = () => {
    db.query("SELECT * FROM job", function (err, res) {
        if (err) throw err;
        console.log(results);
        startMenu();
    });
};

const addEmployee = () => {
    inquirer.prompt([
        {
            message: "What is the employee's first name?",
            name: "first_name",
            type: "input"
        },
        {
            message: "What is the employee's last name?",
            name: "last_name",
            type: "input"
        },
        {
            message: "What is the employee's job title?",
            name: "title",
            type: "input"
        },
        {
            message: "What is the employee's salary?",
            name: "salary",
            type: "input"
        },
        {
            message: "What is the employee's department?",
            name: "dept_name",
            type: "input"
        },
        {
            message: "Who is the employee's manager?",
            name: "manager_id",
            type: "input"
        }
    ])
    .then(response => {
        db.query(
            "INSERT INTO employee SET ?",
            {
                first_name: response.first_name,
                last_name: response.last_name,
                title: response.title,
                salary: response.salary,
                dept_name: response.dept_name,
                manager_id: response.manager_id
            },
            function (err, res) {
                if (err) throw err;
                console.log(results);
                startMenu();
            }
        );
    });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            message: "What is the name of the department?",
            name: "dept_name",
            type: "input"
        }
    ])
    .then(response => {
       db.query(
            "INSERT INTO department SET ?",
            {
                dept_name: response.dept_name
            },
            function (err, res) {
                if (err) throw err;
                console.log(results);
                startMenu();
            }
        );
    });
};

const addRole = () => {
    inquirer.prompt([
        {
            message: "What is the name of the role?",
            name: "title",
            type: "input"
        },
        {
            message: "What is the salary for this role?",
            name: "salary",
            type: "input"
        },
        {
            message: "What is the department for this role?",
            name: "department_id",
            type: "input"
        }
    ])
    .then(response => {
        db.query(
            "INSERT INTO job SET ?",
            {
                title: response.title,
                salary: response.salary,
                department_id: response.department_id
            },
            function (err, res) {
                if (err) throw err;
                console.log(results);
                startMenu();
            }
        );
    });
};

const startApp = async() => {
    console.log('Welcome to the Employee Tracker!');
    console.log('Please choose an option below to get started:');
  
    startMenu();
  };

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

startApp();
