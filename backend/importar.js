const mysql = require("mysql2")

const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database: "controle_financeiro"
})

const dados = [

/* SALÁRIO */
{descricao:"Salário", valor:759, tipo:"ganho"},
{descricao:"Salário", valor:981, tipo:"ganho"},
{descricao:"Salário", valor:612.25, tipo:"ganho"},
{descricao:"Salário", valor:866, tipo:"ganho"},
{descricao:"Salário", valor:606, tipo:"ganho"},
{descricao:"Salário", valor:506, tipo:"ganho"},
{descricao:"Salário", valor:759, tipo:"ganho"},
{descricao:"Salário", valor:759, tipo:"ganho"},
{descricao:"Salário", valor:759, tipo:"ganho"},
{descricao:"Salário", valor:212.5, tipo:"ganho"},
{descricao:"Salário", valor:759, tipo:"ganho"},
{descricao:"Salário", valor:759, tipo:"ganho"},
{descricao:"Salário", valor:759, tipo:"ganho"},
{descricao:"Salário", valor:500, tipo:"ganho"},

/* DINHEIRO */
{descricao:"Dinheiro", valor:150, tipo:"ganho"},
{descricao:"Dinheiro", valor:20, tipo:"ganho"},
{descricao:"Dinheiro", valor:30, tipo:"ganho"},
{descricao:"Dinheiro", valor:10, tipo:"ganho"},
{descricao:"Dinheiro", valor:50, tipo:"ganho"},
{descricao:"Dinheiro", valor:50, tipo:"ganho"},
{descricao:"Dinheiro", valor:150, tipo:"ganho"},
{descricao:"Dinheiro", valor:50, tipo:"ganho"},
{descricao:"Dinheiro", valor:50, tipo:"ganho"},
{descricao:"Dinheiro", valor:30, tipo:"ganho"},
{descricao:"Dinheiro", valor:7, tipo:"ganho"},
{descricao:"Dinheiro", valor:100, tipo:"ganho"},
{descricao:"Dinheiro", valor:50, tipo:"ganho"},
{descricao:"Dinheiro", valor:61, tipo:"ganho"},
{descricao:"Dinheiro", valor:4.66, tipo:"ganho"},
{descricao:"Dinheiro", valor:9, tipo:"ganho"},
{descricao:"Dinheiro", valor:28.01, tipo:"ganho"},
{descricao:"Dinheiro", valor:70, tipo:"ganho"},
{descricao:"Dinheiro", valor:70, tipo:"ganho"},
{descricao:"Dinheiro", valor:7, tipo:"ganho"},

/* MERCADO LIVRE */
{descricao:"Mercado Livre", valor:-266.11, tipo:"gasto"},
{descricao:"Mercado Livre", valor:-47.37, tipo:"gasto"},
{descricao:"Mercado Livre", valor:-140, tipo:"gasto"},
{descricao:"Mercado Livre", valor:-49.55, tipo:"gasto"},
{descricao:"Mercado Livre", valor:-331.64, tipo:"gasto"},
{descricao:"Mercado Livre", valor:-126, tipo:"gasto"},
{descricao:"Mercado Livre", valor:-39.39, tipo:"gasto"},

/* SHOPEE */
{descricao:"Shopee", valor:-79.55, tipo:"gasto"},
{descricao:"Shopee", valor:-80.27, tipo:"gasto"},
{descricao:"Shopee", valor:-36.48, tipo:"gasto"},
{descricao:"Shopee", valor:-65.98, tipo:"gasto"},
{descricao:"Shopee", valor:-52.55, tipo:"gasto"},
{descricao:"Shopee", valor:-44.99, tipo:"gasto"},
{descricao:"Shopee", valor:-79.55, tipo:"gasto"},
{descricao:"Shopee", valor:-80.27, tipo:"gasto"},
{descricao:"Shopee", valor:-36.48, tipo:"gasto"},
{descricao:"Shopee", valor:-65.98, tipo:"gasto"},
{descricao:"Shopee", valor:-52.55, tipo:"gasto"},
{descricao:"Shopee", valor:-44.99, tipo:"gasto"},

/* JIU JITSU */
{descricao:"Jiu Jitsu", valor:-250, tipo:"gasto"},
{descricao:"Jiu Jitsu", valor:-100, tipo:"gasto"},
{descricao:"Jiu Jitsu", valor:-100, tipo:"gasto"},
{descricao:"Jiu Jitsu", valor:-140, tipo:"gasto"},
{descricao:"Jiu Jitsu", valor:-100, tipo:"gasto"},
{descricao:"Jiu Jitsu", valor:-100, tipo:"gasto"},
{descricao:"Jiu Jitsu", valor:-100, tipo:"gasto"},

/* CORTE CABELO */
{descricao:"Corte Cabelo", valor:-30, tipo:"gasto"},
{descricao:"Corte Cabelo", valor:-30, tipo:"gasto"},
{descricao:"Corte Cabelo", valor:-30, tipo:"gasto"},
{descricao:"Corte Cabelo", valor:-30, tipo:"gasto"},
{descricao:"Corte Cabelo", valor:-30, tipo:"gasto"},

/* MESA SOM */
{descricao:"Mesa de Som", valor:100, tipo:"ganho"}

]

db.connect()

dados.forEach(item => {

db.query(
"INSERT INTO transacoes (descricao, valor, tipo) VALUES (?, ?, ?)",
[item.descricao, item.valor, item.tipo],
(err)=>{
if(err){
console.log(err)
}
})

})

console.log("Importação concluída 🚀")