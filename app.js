let amigos = [];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("amigo").addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            adicionarAmigo();
        }
    });
});

const preposicoes = ["da", "de", "do", "das", "dos"];

function formatarNome(nome) {
    return nome
        .toLowerCase()
        .split(" ")
        .map((palavra, index) =>
            preposicoes.includes(palavra) && index !== 0
                ? palavra
                : palavra.charAt(0).toUpperCase() + palavra.slice(1)
        )
        .join(" ");
}

function adicionarAmigo() {
    const input = document.getElementById("amigo");
    let nome = input.value.trim();

    if (nome === "") {
        alert("Por favor, digite um nome válido!");
        return;
    }

    nome = formatarNome(nome);

    if (amigos.some(amigo => amigo.toLowerCase() === nome.toLowerCase())) {
        alert("Esse nome já foi adicionado!");
        return;
    }

    amigos.push(nome);
    atualizarLista();
    input.value = "";
}

function atualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "X";
        botaoRemover.classList.add("remove-btn");
        botaoRemover.onclick = () => removerAmigo(index);

        li.appendChild(botaoRemover);
        lista.appendChild(li);
    });
}

function removerAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Adicione pelo menos dois amigos antes de sortear!");
        return;
    }

    const indiceSorteado = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[indiceSorteado];

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `<p>🎉 O amigo secreto sorteado é: <strong>${amigoSorteado}</strong> 🎉</p>`;
}
