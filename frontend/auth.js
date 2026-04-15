async function login(){

const email = document.getElementById("email").value
const senha = document.getElementById("senha").value

const res = await fetch("http://localhost:3000/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email,
senha
})

})

if(res.status === 200){

const usuario = await res.json()

localStorage.setItem("usuario",usuario.id)

window.location.href = "index.html"

}else{

alert("Usuário não encontrado")

}

}


async function cadastrar(){

const nome = document.getElementById("nome").value
const email = document.getElementById("email").value
const senha = document.getElementById("senha").value

await fetch("http://localhost:3000/cadastro",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
nome,
email,
senha
})

})

alert("Usuário criado")

window.location.href="login.html"

}