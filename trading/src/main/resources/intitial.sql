-- Drop tables if they exist
CREATE DATABASE IF NOT EXISTS reconciliation_db;
USE reconciliation_db;
DROP TABLE IF EXISTS trade;
DROP TABLE IF EXISTS instrument;
DROP TABLE IF EXISTS reconciliation_difference CASCADE;
DROP TABLE IF EXISTS reconciliation_run CASCADE;
 
-- Trade Table
CREATE TABLE trade (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    trade_id VARCHAR(255),
    instrument VARCHAR(255),
    price NUMERIC,
    quantity INTEGER,
    source_system VARCHAR(255),
    trade_date DATE
);
 
 
-- Instrument Table
CREATE TABLE instrument (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    symbol VARCHAR(50),
    name VARCHAR(100),
    isin VARCHAR(20)
);
 
-- Reconciliation Run Table
CREATE TABLE reconciliation_run (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    run_date TIMESTAMP,
    status VARCHAR(20),
    matched_count INTEGER,
    unmatched_count INTEGER
);
 
-- Reconciliation Difference Table
CREATE TABLE reconciliation_difference (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    trade_id VARCHAR(255),
    field_name VARCHAR(100),
    value_system_a VARCHAR(255),
    value_system_b VARCHAR(255),
    reconciliation_run_id INT UNSIGNED,
    CONSTRAINT fk_run_id FOREIGN KEY (reconciliation_run_id) REFERENCES reconciliation_run(id) ON DELETE CASCADE
);

 