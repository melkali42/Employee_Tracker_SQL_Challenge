use employee_tracker_db;

insert into department (name) values
('HR'),
('Engineering'),
('Marketing'),
('IT'),
('Administration'),
('Production');

insert into role (title, salary, department_id) values
('HR Manager', 80000, 1),
('Software Engineer', 100000, 2),
('Marketing Specialist', 65000, 3),
('IT Director', 75000, 4),
('Admin Coordinator', 50000, 5),
('Senior Producer', 63000, 6);

insert into employee (first_name, last_name, role_id, manager_id) values
('Harry', 'Potter', 1, 1),
('Ron', 'Weasley', 2, 2),
('Hermione', 'Granger', 3, 3),
('Albus', 'Dumbledore', 4, 4),
('Neville', 'Longbottom', 5, 5),
('Luna', 'Lovegood', 6, 6);