drop database if exists webapp;
create database webapp;
use webapp;
create table appconfig (
        task_id INT AUTO_INCREMENT PRIMARY KEY,
        task_name varchar(32)
);
