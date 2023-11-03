-- Create database
CREATE DATABASE test_db;
\c test_db;

-- Set time zone
SET TIME ZONE 'Asia/Seoul';

-- Create tables
BEGIN;
CREATE TABLE IF NOT EXISTS cars (
    id integer PRIMARY KEY,
    model character varying(255) DEFAULT NULL,
    horsepower integer DEFAULT NULL,
    max_speed integer DEFAULT NULL,
    year integer DEFAULT NULL,
    price float DEFAULT null
);
INSERT INTO cars (id, model, horsepower, max_speed, year, price) VALUES
('1', 'ford', '10', '230', '2010', '31000'),
('2', 'cherolet', '10', '330', '2010', '41000'),
('3', 'toyota', '10', '430', '2011', '41000'),
('4', 'volkswagen', '10', '530', '2011', '51000'),
('5', 'amc', '10', '630', '2012', '61000'),
('6', 'pontiac', '10', '730', '2012', '71000'),
('7', 'datsun', '10', '830', '2013', '81000'),
('8', 'hyundai', '10', '930', '2013', '91000'),
('9', 'hyundai', '11', '940', '2014', '92000'),
('10', 'kia', '10', '1030', '2014', '101000'),
('11', 'genesis', '10', '1130', '2014', '111000'),
('12', 'genesis', '11', '1140', '2015', '112000');
END;

-- Grant privileges
GRANT CONNECT ON DATABASE test_db TO sqlbot_user;
GRANT insert, delete, update, select on cars to sqlbot_user;