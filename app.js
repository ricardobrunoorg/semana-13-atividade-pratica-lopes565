const API_URL = "http://localhost:3000/carros";

if (document.getElementById("carouselConteudo")) {
    carregarHome();
}

if (document.getElementById("detalhesCarro")) {
    carregarDetalhe();
}

async function carregarHome() {

    const resposta = await fetch(API_URL);

    const carros = await resposta.json();

    carregarDestaques(carros);

    carregarCards(carros);
}

function carregarDestaques(carros) {

    const destaques = carros.filter(c => c.destaque);

    let html = "";

    destaques.forEach((carro, index) => {

        html += `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
            <img src="${carro.imagem}" class="d-block w-100">

            <div class="carousel-caption">
                <h3>${carro.nome}</h3>
                <p>${carro.descricao}</p>
            </div>
        </div>
        `;
    });

    document.getElementById("carouselConteudo").innerHTML = html;
}

function carregarCards(carros) {

    let html = "";

    carros.forEach(carro => {

        html += `
        <div class="col-md-4 mb-4">

            <div class="card h-100">

                <img src="${carro.imagem}" class="card-img-top">

                <div class="card-body">

                    <h5>${carro.nome}</h5>

                    <p>${carro.descricao}</p>

                    <p><strong>Categoria:</strong> ${carro.categoria}</p>

                    <p><strong>Preço:</strong> R$ ${carro.preco}</p>

                    <a href="details.html?id=${carro.id}"
                       class="btn btn-primary">

                        Ver detalhes

                    </a>

                </div>

            </div>

        </div>
        `;
    });

    document.getElementById("cardsArea").innerHTML = html;
}

async function carregarDetalhe() {

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    if (!id) {

        document.getElementById("detalhesCarro").innerHTML =
            "<h2>ID não informado</h2>";

        return;
    }

    try {

        const resposta = await fetch(`${API_URL}/${id}`);

        if (!resposta.ok) {
            throw new Error();
        }

        const carro = await resposta.json();

        document.getElementById("detalhesCarro").innerHTML = `

        <div class="row">

            <div class="col-md-5">

                <img src="${carro.imagem}"
                     class="img-fluid rounded">

            </div>

            <div class="col-md-7">

                <h1>${carro.nome}</h1>

                <ul>

                    <li><strong>Ano:</strong> ${carro.ano}</li>

                    <li><strong>Motor:</strong> ${carro.motor}</li>

                    <li><strong>Potência:</strong> ${carro.potencia}</li>

                    <li><strong>Categoria:</strong> ${carro.categoria}</li>

                    <li><strong>Preço:</strong> R$ ${carro.preco}</li>

                </ul>

                <p>${carro.historia}</p>

                <p><strong>Tags:</strong> ${carro.tags.join(", ")}</p>

            </div>

        </div>
        `;

        let fotos = "";

        if (carro.fotos) {

            carro.fotos.forEach(foto => {

                fotos += `
                <div class="col-md-3">

                    <div class="card">

                        <img src="${foto.imagem}" class="card-img-top">

                        <div class="card-body">

                            <h6>${foto.titulo}</h6>

                        </div>

                    </div>

                </div>
                `;
            });
        }

        document.getElementById("fotosAssociadas").innerHTML = fotos;

    } catch {

        document.getElementById("detalhesCarro").innerHTML =
            "<h2>Carro não encontrado</h2>";
    }
}