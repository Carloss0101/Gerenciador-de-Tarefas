const tarefas = [
    {
        nome: 'Comprar supermercado',
        descricao: 'Ir ao mercado e comprar itens essenciais como comida e produtos de limpeza.',
        concluido: false
    },
    {
        nome: 'Estudar para a faculdade',
        descricao: 'Dedicar algumas horas para estudar para as provas ou revisar conteúdos da faculdade.',
        concluido: false
    },
    {
        nome: 'Fazer exercício',
        descricao: 'Praticar uma atividade física, como caminhar, correr ou fazer musculação.',
        concluido: false
    }
];



function atualizarTarefas() {
    const geral = document.getElementById('tarefas');
    geral.innerHTML = ''; 

    for(let i = 0; i < tarefas.length; i++) {
        const div = document.createElement('div');
        div.classList.add('item-tarefas');

        const div1 = document.createElement('div');
        div1.classList.add('item');

        const input = document.createElement('input');
        input.type = "checkbox";
        input.checked = tarefas[i].concluido;
        input.addEventListener("click", function() {
            TarefaConcluida(i)
        })

        const h3 = document.createElement('h3');
        h3.textContent = tarefas[i].nome;
        h3.addEventListener("click", function() {
            EmbadInfoTarefas(i);
        })

        const div2 = document.createElement('div');
        div2.classList.add('item');

        const img1 = document.createElement('img');
        img1.src = 'imagens/editar.png';
        img1.classList.add('icon');
        img1.addEventListener("click", function() {
            abrirFormularioEdicao(i)
        })

        const img2 = document.createElement('img');
        img2.src = 'https://carloss0101.github.io/Gerenciador-de-Tarefas/imagens/apagar.png';
        img2.classList.add('icon');

        img2.addEventListener("click", function() {
            removerTarefa(i); 
        });        

        div1.appendChild(input);
        div1.appendChild(h3);

        div2.appendChild(img1);
        div2.appendChild(img2);

        div.appendChild(div1);
        div.appendChild(div2);

        geral.appendChild(div);

        if(tarefas[i].concluido == true) {
            h3.style.textDecoration = 'line-through';
        }
    }
}
atualizarTarefas()
function adicionarTarefa(nome, descricao) {
    tarefas.push({
        nome: nome,
        descricao: descricao,
        concluido: false
    });

    console.log("Tarefa adicionada:", nome, descricao); 
    atualizarTarefas();
    document.getElementById("Embad").style.display = 'none';
}

document.getElementById("formTarefa").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const inputNome = document.getElementById("nome").value;
    const textDescricao = document.getElementById("descricao").value;

    if (inputNome !== "") { 
        adicionarTarefa(inputNome, textDescricao);
        inputNome.value = ""; 
        textDescricao.value = "";
    }
});

function EmbadTarefa() {
    document.getElementById("Embad").style.display = 'block';
}


function removerTarefa(num_tarefa) {
    console.log("Tarefa apagada:", tarefas[num_tarefa].nome); 
    tarefas.splice(num_tarefa, 1);
    atualizarTarefas()
}

function editarTarefa(num_tarefa, novoNome, novodesc) {
    document.getElementById("Embad2").style.display = 'none';

    if (novoNome !== "") {
        tarefas[num_tarefa].nome = novoNome;
        tarefas[num_tarefa].descricao = novodesc
        atualizarTarefas();
    }
}

function abrirFormularioEdicao(num_tarefa) {
    const embed = document.getElementById("Embad2");
    const inputNome = document.getElementById("nomeEdit");
    const textdesc = document.getElementById("descricaoEdit");

    inputNome.value = tarefas[num_tarefa].nome; 
    textdesc.value = tarefas[num_tarefa].descricao;
    embed.style.display = 'block';

    document.getElementById("formEditTarefa").onsubmit = function(event) {
        event.preventDefault();
        editarTarefa(num_tarefa, inputNome.value, textdesc.value);
    };
}

function TarefaConcluida(i) {
    if(tarefas[i].concluido == false) {
        tarefas[i].concluido = true;
    } else {
        tarefas[i].concluido = false;
    }
    atualizarTarefas();
}


function EmbadInfoTarefas(i) {

    const existente = document.querySelector('.EmbadInfo');
    if (existente) {
        existente.remove();
    }

    body = document.querySelector('body');
    const div = document.createElement('div');
    div.classList.add('EmbadInfo');

    const sair = document.createElement('h1');
    sair.id = 'embadSair';
    sair.innerText = 'X';
    sair.addEventListener("click", function() {
        div.remove(); 
    });

    const h1 = document.createElement('h1');
    h1.innerText = tarefas[i].nome;

    const p = document.createElement('p');
    p.innerText = tarefas[i].descricao;

    div.appendChild(sair);
    div.appendChild(h1);
    div.appendChild(p);

    body.appendChild(div);
}
