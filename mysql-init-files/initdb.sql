drop database if exists nodeapp;
create database nodeapp;
use nodeapp;
create table appconfig (
        task_id INT AUTO_INCREMENT PRIMARY KEY,
        task_name varchar(32)
);
