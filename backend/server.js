const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require("path")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

// Rate limit (anti ataque)
const limiter = rateLimit({
windowMs: 15 * 60 * 1000,
max: 100
})

app.use(limiter)

const SECRET = "segredo_super_seguro"

const DB_FILE = "db.json"

// Criar banco se não existir
if(!fs.existsSync(DB_FILE)){
fs.writeFileSync(DB_FILE, JSON.stringify({
usuarios:[],
transacoes:[]
}))
}

function readDB(){
return JSON.parse(fs.readFileSync(DB_FILE))
}

function writeDB(data){
fs.writeFileSync(DB_FILE, JSON.stringify(data,null,2))
}

// Middleware autenticação
function auth(req,res,next){

const token = req.headers.authorization

if(!token){
return res.status(401).json({erro:"Sem token"})
}

try{

const decoded = jwt.verify(token, SECRET)

req.usuario = decoded

next()

}catch{

res.status(401).json({erro:"Token inválido"})

}

}

// ================= USUÁRIOS =================

// Cadastro
app.post("/usuarios", async (req,res)=>{

const db = readDB()

const {nome,email,senha} = req.body

const hash = await bcrypt.hash(senha,10)

const usuario = {
id:Date.now(),
nome,
email,
senha:hash
}

db.usuarios.push(usuario)

writeDB(db)

res.json(usuario)

})

// Login
app.post("/login", async (req,res)=>{

const db = readDB()

const {email,senha} = req.body

const usuario = db.usuarios.find(
u=>u.email===email
)

if(!usuario){
return res.status(401).json({erro:"Usuário inválido"})
}

const valid = await bcrypt.compare(senha,usuario.senha)

if(!valid){
return res.status(401).json({erro:"Senha inválida"})
}

const token = jwt.sign(
{
id:usuario.id,
email:usuario.email
},
SECRET,
{expiresIn:"7d"}
)

res.json({usuario,token})

})

// ================= TRANSAÇÕES =================

app.get("/transacoes", auth, (req,res)=>{

const db = readDB()

const dados = db.transacoes.filter(
t=>t.usuario===req.usuario.id
)

res.json(dados)

})

app.post("/transacoes", auth, (req,res)=>{

const db = readDB()

const transacao = {
...req.body,
id: Date.now(),
usuario:req.usuario.id
}

db.transacoes.push(transacao)

writeDB(db)

res.json(transacao)

})

app.put("/transacoes/:id", auth, (req,res)=>{

const db = readDB()

const id = Number(req.params.id)

const index = db.transacoes.findIndex(
t=>t.id===id
)

db.transacoes[index] = {
...db.transacoes[index],
...req.body
}

writeDB(db)

res.json(db.transacoes[index])

})

app.delete("/transacoes/:id", auth, (req,res)=>{

const db = readDB()

const id = Number(req.params.id)

db.transacoes = db.transacoes.filter(
t=>t.id!==id
)

writeDB(db)

res.json({ok:true})

})

// ================= FRONTEND =================

app.use(express.static(path.join(__dirname, "../frontend")))

app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "../frontend/index.html"))
})

// ================= SERVIDOR =================

app.listen(3000, "0.0.0.0", () => {
console.log("Servidor seguro rodando 🔐")
})