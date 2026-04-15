const usuario = localStorage.getItem("usuario")

if(!usuario){
window.location.href="login.html"
}

const lista = document.getElementById("lista")

let grafico
let grafico2

let editandoId = null

async function carregarTransacoes(){

const res = await fetch(`http://localhost:3000/transacoes/${usuario}`)
let dados = await res.json()

const filtroMes = document.getElementById("filtroMes").value
const pesquisa = document.getElementById("pesquisa").value.toLowerCase()
const ordenar = document.getElementById("ordenar").value

// filtro
dados = dados.filter(item=>{

if(filtroMes){
const mes = item.data.substring(0,7)
if(mes !== filtroMes) return false
}

if(pesquisa){
if(!item.descricao.toLowerCase().includes(pesquisa)) return false
}

return true

})

// ordenar
dados.sort((a,b)=>{

if(ordenar==="recente"){
return new Date(b.data) - new Date(a.data)
}else{
return new Date(a.data) - new Date(b.data)
}

})

lista.innerHTML=""

let total=0
let ganhos=0
let gastos=0

let categorias={}

dados.forEach(item=>{

let valor = Number(item.valor)

total += valor

if(valor >= 0){
ganhos += valor
}else{
gastos += Math.abs(valor)
}

if(!categorias[item.categoria]){
categorias[item.categoria]=0
}

categorias[item.categoria]+=Math.abs(valor)

const div = document.createElement("div")

div.className="item"

div.innerHTML=`

<div>
<strong>${item.descricao}</strong>
<br>
<small>${item.categoria} - ${item.data}</small>
</div>

<span class="${valor>=0?"positivo":"negativo"}">
R$ ${valor.toFixed(2)}
</span>

<div>
<button onclick="editar(${item.id})">Editar</button>
<button onclick="excluir(${item.id})">Excluir</button>
</div>

`

div.classList.add("fade")

lista.appendChild(div)

})

document.getElementById("saldo").innerText = "R$ "+total.toFixed(2)
document.getElementById("ganhos").innerText = "R$ "+ganhos.toFixed(2)
document.getElementById("gastos").innerText = "R$ "+gastos.toFixed(2)

criarGrafico(categorias)
criarGrafico2(ganhos,gastos)

}

async function adicionar(){

const descricao = document.getElementById("descricao").value
let valor = document.getElementById("valor").value
const tipo = document.getElementById("tipo").value
const categoria = document.getElementById("categoria").value
const data = document.getElementById("data").value

if(tipo==="gasto"){
valor = -Math.abs(valor)
}

if(editandoId){

await fetch(`http://localhost:3000/transacoes/${editandoId}`,{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({descricao,valor,tipo,categoria,data,usuario})
})

editandoId=null

}else{

await fetch("http://localhost:3000/transacoes",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({descricao,valor,tipo,categoria,data,usuario})
})

}

limpar()
carregarTransacoes()

}

function limpar(){

document.getElementById("descricao").value=""
document.getElementById("valor").value=""

}

async function editar(id){

const res = await fetch(`http://localhost:3000/transacoes/${usuario}`)
const dados = await res.json()

const item = dados.find(i=>i.id===id)

document.getElementById("descricao").value=item.descricao
document.getElementById("valor").value=Math.abs(item.valor)
document.getElementById("categoria").value=item.categoria
document.getElementById("data").value=item.data

document.getElementById("tipo").value =
item.valor >=0 ? "ganho":"gasto"

editandoId=id

}

async function excluir(id){

await fetch(`http://localhost:3000/transacoes/${id}`,{
method:"DELETE"
})

carregarTransacoes()

}

function criarGrafico(categorias){

const ctx = document.getElementById("grafico")

if(grafico) grafico.destroy()

grafico = new Chart(ctx,{

type:"doughnut",

data:{
labels:Object.keys(categorias),
datasets:[{
data:Object.values(categorias)
}]
}

})

}

function criarGrafico2(ganhos,gastos){

const ctx = document.getElementById("grafico2")

if(grafico2) grafico2.destroy()

grafico2 = new Chart(ctx,{

type:"bar",

data:{
labels:["Ganhos","Gastos"],
datasets:[{
data:[ganhos,gastos]
}]
}

})

}

async function exportarExcel(){

const res = await fetch(`http://localhost:3000/transacoes/${usuario}`)
const dados = await res.json()

const ws = XLSX.utils.json_to_sheet(dados)

const wb = XLSX.utils.book_new()

XLSX.utils.book_append_sheet(wb, ws, "Financeiro")

XLSX.writeFile(wb,"controle-financeiro.xlsx")

}

function logout(){

localStorage.removeItem("usuario")
window.location.href="login.html"

}

carregarTransacoes()

if("serviceWorker" in navigator){
navigator.serviceWorker.register("service-worker.js")
}