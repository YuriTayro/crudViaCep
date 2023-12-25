
document.addEventListener('DOMContentLoaded', function () {
    const cepInput = document.getElementById('exampleInputPassword1');

    cepInput.addEventListener('input', function () { //evento input vai escutar o evento input no campo de CEP. Este evento é acionado cada vez que o conteúdo do campo é alterado.
        const cep = cepInput.value.replace(/\D/g, ''); //Obtém o valor do campo de CEP e remove todos os caracteres não numéricos usando a expressão regular \D.

        if (cep.length === 8) {
            const url = `index.php?cep=${cep}`;

            fetch(url)
                .then(response => response.json()) //response é um objeto q veio da requisição e será convertido em json e atribuido a variável 'data'.
                .then(data => { //'data' agora contém os dados da resposta no formato json.
                    if (!data.error) { //se não existir erro em data, os formularios serão preenchidos
                        // Preencher os campos do formulário com os dados da API
                        document.getElementById('endereco').value = data.logradouro;
                        document.getElementById('number').value = data.numero;
                        document.getElementById('bairro').value = data.bairro;
                        document.getElementById('city').value = data.localidade;
                        document.getElementById('uf').value = data.uf;
                        document.getElementById('pais').value = 'Brasil'; 
                    } else {
                        alert(data.error);
                    }
                })
                .catch(error => { //usado para lidar com erros na promises.
                    console.error('Erro na requisição:', error); //se ocorrer algum erro, uma msg será exibida no console.
                });
        }
    });
});

// OBS: Essa estrutura de Promise encadeada (fetch().then().then().catch()) é uma maneira eficaz de lidar com 
//operações assíncronas em JavaScript, garantindo que o código seja executado na ordem correta.
//Ex de operações assíncronas: Requisições HTTP, leitura de arquivos, consultas a bancos de dados.