-- Create database
CREATE DATABASE sqlbot;
\c sqlbot;

-- Set time zone
SET TIME ZONE 'Asia/Seoul';

-- Create tables
-- TODO: Add tables

-- Create user
DROP ROLE IF EXISTS sqlbot_user;
CREATE USER data_user WITH PASSWORD 'sqlbot_user_pw';

-- Grant privileges
GRANT CONNECT ON DATABASE sqlbot TO sqlbot_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO sqlbot_user;