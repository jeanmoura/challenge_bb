var  data = null;
var clientes = null;
const xhr = new XMLHttpRequest();


xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    //console.log(this.responseText);
    clientes = JSON.parse(this.responseText);
    clientes.forEach(criaTr);
    //console.log(clientes);

  }
});

xhr.open("GET", "https://www.ksamochvalov.com/academia/listarClientes.php?matricula=F3295813");

xhr.send(data);
//console.log(data);

//console.log(JSON.parse(data));

var clientes = JSON.parse(data);



//console.log(typeof(clientes));
console.log(clientes);

function criaTr(cliente) {
  let clienteTr = document.createElement("tr")

    clienteTr.className += "cliente "
    let salarioMin = 1200

    let rendaFloat = parseFloat(cliente.renda)    
    //if (rendaFloat < salarioMin) {
    //    clienteTr.className += "cliente-invalido "
    //}

    let cpfTd = document.createElement("td")
    let nomeTd = document.createElement("td")
    let dataNascimentoTd = document.createElement("td")
    let idadeTd = document.createElement("td")
    let rendaTd = document.createElement("td")
    //let justificativaTd = document.createElement("td")
    //let matriculaTd = document.createElement("td")

    cpfTd.className += "info-cpf"
    nomeTd.className += "info-nomeCliente"
    dataNascimentoTd.className += "info-dataNascimento"
    //idadeTd.className += "info-idade"
    rendaTd.className += "info-renda"
    //justificativaTd.className += "info-justificativa"
    //matriculaTd.className += "info-matricula"

    cpfTd.textContent = cliente.cpf
    nomeTd.textContent = cliente.nome
    dataNascimentoTd.textContent = cliente.data_nascimento
    
    function ajustaRenda(renda){
      let rendaConvertida = parseFloat(renda).toLocaleString('pt-br',{style: 'decimal',minimumFractionDigits:2})
      return rendaConvertida
  }
    //let ajustaRenda = 0;
    idadeTd.textContent = cliente.idade
    rendaTd.textContent = ajustaRenda(cliente.renda)
    clienteTr.appendChild(rendaTd)
    //justificativaTd.textContent = justificativa

    clienteTr.appendChild(nomeTd)
    clienteTr.appendChild(dataNascimentoTd)
    clienteTr.appendChild(rendaTd)
    clienteTr.appendChild(cpfTd)
    //clienteTr.appendChild(matriculaTd)
    //clienteTr.appendChild(idadeTd)
    
    //clienteTr.appendChild(justificativaTd)
    
    let tabelaClientes = document.querySelector("#tabela-clientes")

    tabelaClientes.appendChild(clienteTr)

    
    //somarAsRendas()
    
    //form.reset()
}