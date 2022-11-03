var  data = null;
var clientes = null;
const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    //console.log(this.responseText);
    clientes = JSON.parse(this.responseText);
    clientes.forEach(criaTr);
    
  }
});

xhr.open("GET", "https://www.ksamochvalov.com/academia/listarClientes.php?matricula=F3295813");

xhr.send(data);

var clientes = JSON.parse(data);


function criaTr(cliente) {

  let clienteTr = document.createElement("tr")
    
  

  clienteTr.className += "cliente "
  let salarioMin = 1200
  let rendaFloat = parseFloat(cliente.renda)    
  if (rendaFloat < salarioMin) {
          clienteTr.className += "cliente-invalido "
  }

  let cpfTd = document.createElement("td")
  let nomeTd = document.createElement("td")
  let dataNascimentoTd = document.createElement("td")
  let idadeTd = document.createElement("td")
  let rendaTd = document.createElement("td")
  let justificativaTd = document.createElement("td")
  

  cpfTd.className += "info-cpf"
  nomeTd.className += "info-nomeCliente"
  dataNascimentoTd.className += "info-dataNascimento"
  idadeTd.className += "info-idade"
  rendaTd.className += "info-renda"
  justificativaTd.className += "info-justificativa"
  

 
  function converteFormatoData(data_nascimento){
    let dia = data_nascimento.substring(8, 10)
    let mes = data_nascimento.substring(5, 7)
    let ano = data_nascimento.substring(0, 4)
    dataConvertida = dia + "/" + mes + "/" + ano
    return dataConvertida
  }


  function calculaIdade(dataNascimento){
      //Convertando data de Hoje e data de Nascimento em milesegundos
      const hoje = new Date() // Data de hoje
      const nascimento = new Date(dataNascimento) // Outra data no passado

      // Cálculo de Idade em Anos utilizando MILISEGUNDOS
      const diferencaMilisegundos = Math.abs(hoje.getTime() - nascimento.getTime()) //Subtrai uma data pela outra    
      const idade = Math.ceil(diferencaMilisegundos / (1000 * 60 * 60 * 24 * 365)) // Divide o total pelo total de milisegundos correspondentes a 1 ano.

      //OU AINDA, cálculo de Idade utilizando meses e anos
      let diferencaMeses = ajustaMesAno(hoje) - ajustaMesAno(nascimento)
      let idadeEmAnos = Math.floor(diferencaMeses / 12)
      let idadeEmMeses = diferencaMeses % 12
      let idadeComAnoseMeses = `${idadeEmAnos} anos e ${idadeEmMeses} meses`

      return idadeComAnoseMeses
  }


  function ajustaMesAno(d) {
      return d.getFullYear() * 12 + d.getMonth() + 1
  }  
  
  function ajustaRenda(renda){
      let rendaConvertida = parseFloat(renda).toLocaleString('pt-br',{style: 'decimal',minimumFractionDigits:2})
      return rendaConvertida
  }
  cpfTd.textContent = cliente.cpf
  nomeTd.textContent = cliente.nome
  dataNascimentoTd.textContent = cliente.data_nascimento
  idadeTd.textContent = cliente.idade
  rendaTd.textContent = ajustaRenda(cliente.renda)
  clienteTr.appendChild(rendaTd)
  justificativaTd.textContent = cliente.justificativa

  clienteTr.appendChild(nomeTd)
  clienteTr.appendChild(dataNascimentoTd)
  clienteTr.appendChild(rendaTd)
  clienteTr.appendChild(cpfTd)
  clienteTr.appendChild(idadeTd)
  clienteTr.appendChild(justificativaTd)
    
    let tabelaClientes = document.querySelector("#tabela-clientes")

    tabelaClientes.appendChild(clienteTr)



    function somarAsRendas(){
      let clientes = document.querySelectorAll(".cliente")
      let somaFloat = 0
      console.log('clientes:',clientes)
      console.log('somaFloat:',somaFloat)
  
      for (var i = 0; i < clientes.length; i++) {
          let cliente = clientes[i]
          let tdRenda = cliente.querySelector(".info-renda")
          let rendaString = tdRenda.textContent
          let rendaFloat = parseFloat(rendaString.toString().replace(/\./g, '').replace(',','.'))
          somaFloat = somaFloat + rendaFloat
          console.log('cliente:',cliente)
          console.log('tdRenda:',tdRenda)
          console.log('rendaString:',rendaString)
          console.log('rendaFloat:',rendaFloat)
      }  
      
      let somatorioRendas = document.querySelector("#somatorioRendas")
      let somaString = somaFloat.toLocaleString('pt-br',{style: 'decimal',minimumFractionDigits:2})
      somatorioRendas.innerHTML = somaString
  
  }
  
  
  function verificaRenda(renda) {
      let rendaFloat = parseFloat(renda)
      
      if (rendaFloat < salarioMinimo) {
  
          let justificativa = prompt("Valor informado da renda é inferior a um salário mínimo (R$ " + salarioMinimo.toLocaleString('pt-br',{style: 'decimal',minimumFractionDigits:2}) + "). Justifique:", "");
          if (justificativa != "") {
              alert("Obrigado por justificar!");
            }
          else {
              justificativa = "Faltou justificar!";
          };     
  
          return justificativa;
                  
      } else {
          return ""
      }   
  }
  
  
  somarAsRendas()

}

    
