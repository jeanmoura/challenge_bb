

const salarioMinimo = parseFloat(1212.00)

var incluirCliente = document.querySelector("#incluirCliente")
incluirCliente.addEventListener("click", function(event) {
    event.preventDefault()
   
    //criando o formulario    
    let form = document.querySelector("#form-inclui")

    let nome = form.nome.value
    let dataNascimento = form.dataNascimento.value
    let renda = form.renda.value   
    let cpf = form.cpf.value
    let mat = form.matricula.value;
    let idade = calculaIdade(dataNascimento)
    
    let justificativa = verificaRenda(renda) 
    let matricula = form.matricula.value

    
    //cria a linha da tabela para la tabelaClientes
    let clienteTr = document.createElement("tr")

    clienteTr.className += "cliente "

    let rendaFloat = parseFloat(renda)    
    if (rendaFloat < salarioMinimo) {
        clienteTr.className += "cliente-invalido "
    }

    //atribuindo o conteudo das celulas para os atributos:
    let cpfTd = document.createElement("td")
    let nomeTd = document.createElement("td")
    let dataNascimentoTd = document.createElement("td")
    let idadeTd = document.createElement("td")
    let rendaTd = document.createElement("td")
    //let justificativaTd = document.createElement("td")
    let matriculaTd = document.createElement("td")

    cpfTd.className += "info-cpf"
    nomeTd.className += "info-nomeCliente"
    dataNascimentoTd.className += "info-dataNascimento"
    idadeTd.className += "info-idade"
    rendaTd.className += "info-renda"
    justificativaTd.className += "info-justificativa"
    matriculaTd.className += "info-matricula"


    function converteFormatoData(dataNascimento){
        let dia = dataNascimento.substring(8, 10)
        let mes = dataNascimento.substring(5, 7)
        let ano = dataNascimento.substring(0, 4)
        let dataConvertida = dia + "/" + mes + "/" + ano
        return dataConvertida
    }
    
    cpfTd.textContent = cpf
    nomeTd.textContent = nome
    dataNascimentoTd.textContent = converteFormatoData(dataNascimento)
    idadeTd.textContent = idade
    rendaTd.textContent = ajustaRenda(renda)
    clienteTr.appendChild(rendaTd)
    //justificativaTd.textContent = justificativa

    clienteTr.appendChild(nomeTd)
    clienteTr.appendChild(dataNascimentoTd)
    clienteTr.appendChild(rendaTd)
    clienteTr.appendChild(cpfTd)
    //clienteTr.appendChild(matriculaTd)
    
    //clienteTr.appendChild(idadeTd)
    
    cl//ienteTr.appendChild(justificativaTd)
    
    tabelaClientes.appendChild()

    
    somarAsRendas()
    
    form.reset()

    //Insere dados de novo cliente na lista de clientes
    /*var data = JSON.stringify({
        clienteTr
      });
      
      var xhr = new XMLHttpRequest();
      
      
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          console.log(this.responseText);
        }
      });
      
      xhr.open("POST", "https://www.ksamochvalov.com/academia/inserirCliente.php");
          
      xhr.send(data);

      

    let tabelaClientes = document.querySelector("#tabela-clientes")

    
});
*/




function converteFormatoData(dataNascimento){
    let dia = dataNascimento.substring(8, 10)
    let mes = dataNascimento.substring(5, 7)
    let ano = dataNascimento.substring(0, 4)
    let dataConvertida = dia + "/" + mes + "/" + ano
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



var tabelaClientes = document.querySelector("#tabela-clientes");

tabelaClientes.addEventListener("dblclick", function(event) {
    
    setTimeout(function() {
        var result = confirm("Deseja deletar o cliente?");
        if (result) {
        //Logica para deletar o item/cliente.
        event.target.parentNode.classList.add("fadeOut");
        event.target.parentNode.remove();
        }
    
    }, 700);

});




