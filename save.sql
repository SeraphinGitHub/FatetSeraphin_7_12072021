CREATE DATABASE IF NOT EXISTS seraphin_projet_07;
USE seraphin_projet_07;

CREATE TABLE IF NOT EXISTS users (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    email varchar(255) UNIQUE,
    password varchar(255),
    lastName varchar(255),
    firstName varchar(255),
    position varchar(255),
    department varchar(255),
    createdAt datetime NOT NULL,
    updatedAt datetime NOT NULL,
    isAdmin tinyint(1) NOT NULL,
);

CREATE TABLE IF NOT EXISTS publications (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    userId int NOT NULL,
    textContent varchar(255) DEFAULT NULL,
    picture varchar(255) DEFAULT NULL,
    createdAt varchar(255) NOT NULL,
    updatedAt varchar(255) NOT NULL,
);