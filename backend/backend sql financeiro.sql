drop database if exists controle_financeiro;

CREATE DATABASE controle_financeiro;



USE controle_financeiro;

CREATE TABLE transacoes (
id INT AUTO_INCREMENT PRIMARY KEY,
descricao VARCHAR(255),
valor DECIMAL(10,2),
tipo VARCHAR(50),
data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE transacoes 
ADD categoria VARCHAR(100);


DESCRIBE transacoes;

CREATE TABLE usuarios (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100),
email VARCHAR(100) UNIQUE,
senha VARCHAR(100)
);

ALTER TABLE transacoes ADD usuario_id INT;