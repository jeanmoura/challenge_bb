function inserirClienteBD(cliente, matricula) {
    const url = 'https://pxl0hosp0577.dispositivos.bb.com.br/talentosos/inserirCliente'

   let cpf_int = parseInt(cliente.cpf.replace(/\./gi, '').replace('-', ''))

    const dadosCliente = {
        "nome": cliente.nomeCliente,
        "data_nascimento": cliente.dataNascimento,
        "renda": cliente.renda,
        "cpf": cpf_int,
        "matricula": matricula
    }
    
    const clienteJson = JSON.stringify(dadosCliente)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send(clienteJson)
    xhr.onload = function() {
        if (xhr.status == 201) {
            alert('Registro cadastrado com sucesso!')
            form.reset()
            listarClientesDoBD(matricula)
        } else {
            alert(`Status: ${xhr.status}`)
        }
    }
}


listarClientesDoBD(matricula)


function listarClientesDoBD(matricula) {
    let listaClientes = [];
    const url = 'https://pxl0hosp0577.dispositivos.bb.com.br/talentosos/listarClientes/'
    
    var xhr = new XMLHttpRequest();

    xhr.open("GET", `${url}${matricula}`);
    xhr.send();

    xhr.addEventListener("load", function() {       
        if (xhr.status == 200) {          
            const resposta = xhr.responseText;
            const clientes = JSON.parse(resposta);

            clientes.forEach(function(cliente) {

                const dataNascimento = tratarDataNascimento(cliente.data_nascimento)                
                const idadeCalculada = calculaIdade(dataNascimento)
                const renda = parseFloat(cliente.renda)

                let justificativa = ''
                justificativas.forEach(just => {
                    if (just.codCliente == cliente.cd_clientes) {
                        justificativa = just.texto
                    }
                })

                const clienteObj = {
                    codigo: cliente.cd_clientes,
                    cpf: cliente.cpf,
                    nomeCliente: cliente.nome,
                    dataNascimento: dataNascimento,
                    idade: idadeCalculada,
                    renda: renda,
                    trabEscravo: renda < salarioMinimo
                }

                listaClientes.push(clienteObj)
                    
            });

            adicionaClienteNaTabela(listaClientes)

            somarAsRendas()   

        } else {
            // erroAjax.classList.remove("invisivel");
        }

        

    });
}



function deletarClienteBD(codCliente) {
    const url = 'https://pxl0hosp0577.dispositivos.bb.com.br/talentosos/deletarCliente'
    
    const xhr = new XMLHttpRequest();

    const param = {}
    param.cd_clientes = codCliente

    xhr.open("DELETE", url);
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send(JSON.stringify(param)) 
    xhr.onload = function() {       
        if (xhr.status == 200) {
            alert('Registro excluído com sucesso')
            listarClientesDoBD(matricula)
        } else {
            alert(`Status: ${xhr.status}`)
        }
    }

}
