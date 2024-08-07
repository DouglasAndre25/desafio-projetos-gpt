const itens = [
  {
    id: 1,
    description: "Estudar para a prova de algoritmos 3",
    status: "closed",
  },
  {
    id: 2,
    description: "Completar o projeto de desenvolvimento web",
    status: "opened",
  },
  {
    id: 3,
    description: "Ler o capítulo 4 do livro de ciência de dados",
    status: "closed",
  },
  {
    id: 4,
    description: "Participar da reunião do grupo de estudo",
    status: "opened",
  },
  {
    id: 5,
    description: "Fazer os exercícios de cálculo 2",
    status: "closed",
  },
  {
    id: 6,
    description: "Revisar as notas da aula de física quântica",
    status: "opened",
  },
  {
    id: 7,
    description: "Escrever o relatório de laboratório de química",
    status: "closed",
  },
  {
    id: 8,
    description: "Assistir a palestra sobre inteligência artificial",
    status: "opened",
  },
  {
    id: 9,
    description: "Preparar a apresentação do seminário de história",
    status: "closed",
  },
  {
    id: 10,
    description: "Praticar problemas de programação competitiva",
    status: "opened",
  },
];

const renderCardItem = (item) => {
  return `<div class="card" id="card-${item.id}">
        <h5>${item.description}</h5>
        <div class="card-actions">
          <select>
            <option value="opened" ${
              item.status === "opened" ? "selected" : ""
            }>Em andamento</option>
            <option value="closed" ${
              item.status === "closed" ? "selected" : ""
            }>Concluído</option>
          </select>
          <div class="card-buttons">
            <button>
              <span class="material-symbols-outlined"> edit </span>
            </button>
            <button>
              <span class="material-symbols-outlined"> delete </span>
            </button>
          </div>
        </div>
      </div>`;
};

const initialData = () => {
  const render = itens.map((item) => renderCardItem(item)).join(" ");
  const cardContainer = document.querySelector("#cards");

  cardContainer.innerHTML += render;
};

const handleInput = (event) => {
  const input = event.target;
  const button = document.querySelector(".new-item-button");
  if (input.value.trim() === "") {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
};

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector(".new-item-input");
  if (input.value.trim() !== "") {
    const item = {
      id: itens.length + 1,
      description: input.value,
      status: "opened",
    };
    itens.unshift(item);
    input.value = "";

    const cardHtml = renderCardItem(item);
    const cardContainer = document.querySelector("#cards");

    cardContainer.innerHTML = cardHtml + cardContainer.innerHTML;

    const button = document.querySelector(".new-item-button");
    button.disabled = true;
  }
}

initialData();
