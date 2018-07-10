DROP DATABASE IF EXISTS dispatch_dashboard;
CREATE DATABASE dispatch_dashboard;
USE dispatch_dashboard;

CREATE TABLE Drivers (
  id INTEGER AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  PRIMARY KEY(id)
);

CREATE TABLE Dispatches (
  id INTEGER AUTO_INCREMENT NOT NULL,
  driver INTEGER NOT NULL,
  checkin DATETIME NOT NULL,
  checkout DATETIME,
  bol_image VARCHAR(255),
  PRIMARY KEY(id)
);
