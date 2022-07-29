INSERT INTO department (department_name)
VALUES ("Front-End Development"),
       ("Back-End Development"),
       ("Sales Department"),
       ("Marketing Department");

INSERT INTO company_role (title, salary, department_id)
VALUES ("Senior Front-End Developer", 150000, 1),
       ("Front-End Developer", 100000, 1),
       ("Senior Software Engineer", 150000, 2),
       ("Software Engineer", 100000, 2),
       ("Sales Manager", 100000, 3),
       ("Sales Associate", 75000, 3),
       ("Marketing Manager", 100000, 4),
       ("Marketing Associate", 75000, 4);
    
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1,1 ),
       ("Kevin", "Moa", 2, 1),
       ("Bob", "Kenshi", 2, 1),
       ("Xi", "Lee", 3, 1),
       ("Jacky", "Kang", 4, 1),
       ("Robert", "Kenly", 4, 1),
       ("Jessica", "Anderson", 5, 1),
       ("Stephanie", "Robertson", 6, 1),
       ("Sophia", "Goldberg", 7, 1),
       ("Kim", "Johnson", 8, 1);