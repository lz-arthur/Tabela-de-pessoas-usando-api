let dadosPessoas = [];
let dadosFiltrados = [];

async function carregarDados() {
    let pais = document.querySelector("select").value;
    let response = await fetch(`https://randomuser.me/api/?results=10&nat=${pais}`);
    let data = await response.json();
    dadosPessoas = data.results;
    dadosFiltrados = dadosPessoas; 

    renderizarTabela(dadosFiltrados);

    document.querySelector("#tabela").classList.add("ativo");
    document.querySelector("#input").innerHTML = `<br>
    <input type="text" id="filtro" placeholder="Filtrar por nome" oninput="filtrar()">`
    document.querySelector("#filtro").value = ""; // limpa filtro anterior
    document.querySelector("#botoes").innerHTML = `<br>
        <button onclick="ordem('idade')">Ordenar por idade</button>
        <button onclick="ordem('nome')">Ordenar por nome</button>`;
    
}

function renderizarTabela(lista) {
    let linhas = lista.map(pessoa => `
        <tr>
            <td><img src="${pessoa.picture.thumbnail}" alt="Foto de ${pessoa.name.first}" onclick="abrirFoto('${pessoa.picture.large}')"/></td>
            <td>${pessoa.name.first} ${pessoa.name.last}</td>
            <td>${pessoa.dob.age}</td>
            <td>${pessoa.location.state}</td>
            <td><a href="mailto:${pessoa.email}">${pessoa.email}</a></td>
        </tr>
        `);

    document.querySelector("#pessoas thead").innerHTML = `<tr>
            <th>Foto</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Estado</th>
            <th>Email</th>
        </tr>`;
    document.querySelector("#pessoas tbody").innerHTML = linhas.join("") || `<tr><td colspan="5">Nenhum resultado encontrado</td></tr>`;
}

function abrirFoto(urlGrande) {
    document.querySelector("#fotoImg").src = urlGrande;
    document.querySelector("#foto").classList.add("aberto");
}

function fecharFoto() {
    document.querySelector("#foto").classList.remove("aberto");
}

function ordem(op) {
    let ordenado = [...dadosFiltrados];

    if (op === "idade") {
        ordenado.sort((a, b) => a.dob.age - b.dob.age);
    } else if (op === "nome") {
        ordenado.sort((a, b) => a.name.first.localeCompare(b.name.first));
    }

    dadosFiltrados = ordenado; 
    renderizarTabela(ordenado);
}

function filtrar() {
    let texto = document.querySelector("#filtro").value.toLowerCase();

    dadosFiltrados = dadosPessoas.filter(pessoa => {
        let nomeCompleto = `${pessoa.name.first} ${pessoa.name.last}`.toLowerCase();
        return nomeCompleto.includes(texto);
    });

    renderizarTabela(dadosFiltrados);
}
