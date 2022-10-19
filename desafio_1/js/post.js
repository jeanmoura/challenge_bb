const data = JSON.stringify({
    "id": "50",
    "nome": "Jean Moura",
    "data_nascimento": "1989-02-16",
    "renda": "3000.00",
    "cpf": "00862345678",
    "matricula": "F3295813"
  });
  
  const xhr = new XMLHttpRequest();
  
  
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });
  
  xhr.open("POST", "https://www.ksamochvalov.com/academia/inserirCliente.php");
  
  
  xhr.send(data);