const formulario = document.getElementById('formulario-cliente');
const mensagem = document.getElementById('mensagem');

if (formulario) {
    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Obter os valores dos campos do formulário
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const endereco = document.getElementById('endereco').value;
        const telefone = document.getElementById('telefone').value;
        const email = document.getElementById('email').value;
        const sexo = document.querySelector('input[name="sexo"]:checked').value;

        // Criar um objeto com os dados do cliente
        const dadosCliente = {
            nome: nome,
            cpf: cpf,
            endereco: endereco,
            telefone: telefone,
            email: email,
            sexo: sexo
        };

        // Obter os dados salvos no LocalStorage
        const dadosSalvosJSON = localStorage.getItem('dadosCliente');

        // Verificar se já existem dados salvos
        if (dadosSalvosJSON) {
            const dadosSalvos = JSON.parse(dadosSalvosJSON);

            // Comparar o CPF do formulário com os CPFs salvos
            if (dadosSalvos.some(cliente => cliente.cpf === cpf)) {
                mensagem.textContent = "Cadastro Inválido! Tente novamente.";
                mensagem.style.color = "red"; // Exibe a mensagem em vermelho
            } else {
                // Adicionar o novo cliente aos dados salvos
                dadosSalvos.push(dadosCliente);
                localStorage.setItem('dadosCliente', JSON.stringify(dadosSalvos));
                mensagem.textContent = "Cadastro feito com Sucesso!";
                mensagem.style.color = "green"; // Exibe a mensagem em verde
            }
        } else {
            // Salvar o primeiro cliente no LocalStorage
            localStorage.setItem('dadosCliente', JSON.stringify([dadosCliente]));
            mensagem.textContent = "Cadastro feito com Sucesso!";
            mensagem.style.color = "green"; // Exibe a mensagem em verde
        }
    });
}

// script.js
const tipoServico = document.getElementById('tipo-servico');
const dataAgendamento = document.getElementById('data-agendamento');
const agendarServico = document.getElementById('agendar-servico');
const mensagemAgendamento = document.getElementById('mensagem-agendamento');

// Adicione este bloco de código para mostrar/esconder o campo de endereço
tipoServico.addEventListener('change', function() {
    if (tipoServico.value === 'entrega') {
        document.getElementById('campo-endereco').style.display = 'block';
    } else {
        document.getElementById('campo-endereco').style.display = 'none';
    }
});

agendarServico.addEventListener('click', function() {
    const tipo = tipoServico.value;
    const data = dataAgendamento.value;
    let enderecoEntrega = null;
    let cepEntrega = null;
    let cidadeEntrega = null;

    if (tipo === 'entrega') {
        enderecoEntrega = document.getElementById('endereco-entrega').value;
        cepEntrega = document.getElementById('cep-entrega').value;
        cidadeEntrega = document.getElementById('cidade-entrega').value;

        if (!enderecoEntrega || !cepEntrega || !cidadeEntrega) {
            mensagemAgendamento.textContent = "Por favor, preencha todos os campos de entrega.";
            mensagemAgendamento.style.color = "red";
            return;
        }
    }

    const agendamento = {
        tipo: tipo,
        data: data,
        endereco: enderecoEntrega,
        cep: cepEntrega,
        cidade: cidadeEntrega
    };
    localStorage.setItem('agendamento', JSON.stringify(agendamento));

    mensagemAgendamento.textContent = "Agendamento realizado com sucesso!";
    mensagemAgendamento.style.color = "green";
});

// ... (código anterior) ...

// Carrinho de compras
const carrinhoItens = document.getElementById('carrinho-itens');
const carrinhoTotal = document.getElementById('carrinho-total');
const finalizarCompra = document.getElementById('finalizar-compra');
let carrinho = []; // Array para armazenar os itens do carrinho

// Função para adicionar item ao carrinho
function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();
}

// Função para atualizar o carrinho
function atualizarCarrinho() {
  carrinhoItens.innerHTML = '';
  let total = 0;
  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    carrinhoItens.appendChild(li);
    total += item.preco;
  });
  carrinhoTotal.textContent = total.toFixed(2);
}

// Adicionar evento aos botões "Adicionar ao Carrinho"
const botoesAdicionar = document.querySelectorAll('.adicionar-ao-carrinho');
botoesAdicionar.forEach(botao => {
  botao.addEventListener('click', () => {
    const nome = botao.dataset.nome;
    const preco = parseFloat(botao.dataset.preco);
    adicionarAoCarrinho(nome, preco);
  });
});

// Evento para finalizar a compra (apenas um exemplo)
finalizarCompra.addEventListener('click', () => {
  alert(`Compra finalizada! Total: R$ ${carrinhoTotal.textContent}`);
  carrinho = [];
  atualizarCarrinho();
}); 