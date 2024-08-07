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

const cardContainer = document.querySelector("#cards");
const addButton = document.querySelector(".new-item-button");

const renderCardItem = (item) => {
  return `<div class="card" id="card-${item.id}">
        <h5>${item.description}</h5>
        <div class="card-actions">
          <select onchange="handleSelectChange(event, ${item.id})">
            <option value="opened" ${
              item.status === "opened" ? "selected" : ""
            }>Em andamento</option>
            <option value="closed" ${
              item.status === "closed" ? "selected" : ""
            }>Concluído</option>
          </select>
          <div class="card-buttons">
            <button type="button" onclick="handleEdit(${item.id})">
              <span class="material-symbols-outlined"> edit </span>
            </button>
            <button onclick="handleDelete(${item.id})">
              <span class="material-symbols-outlined"> delete </span>
            </button>
          </div>
        </div>
      </div>`;
};

const renderEditCardItem = (item) => {
  return `
        <form class="edit-item" onsubmit="handleEditSubmit(event, ${item.id})">
            <input class="edit-item-input" value="${
              item.description
            }" oninput="handleInput(event, ${item.id})"/>
            <button type="submit" class="edit-item-button">
                <span class="material-symbols-outlined">check</span>
            </button>
        </form>
        <div class="card-actions">
           <select onchange="handleSelectChange(event, ${item.id})">
            <option value="opened" ${
              item.status === "opened" ? "selected" : ""
            }>Em andamento</option>
            <option value="closed" ${
              item.status === "closed" ? "selected" : ""
            }>Concluído</option>
          </select>
          <div class="card-buttons">
            <button onclick="handleDelete(${item.id})">
              <span class="material-symbols-outlined"> delete </span>
            </button>
          </div>
        </div>
    `;
};

const initialData = () => {
  const render = itens.map((item) => renderCardItem(item)).join(" ");
  cardContainer.innerHTML = render;
};

const handleInput = (event, id) => {
  const editButton = document.querySelector(
    `div#card-${id} > form > .edit-item-button`
  );
  const targetButton = id ? editButton : addButton;
  const input = event.target;

  if (input.value.trim() === "") {
    targetButton.disabled = true;
  } else {
    targetButton.disabled = false;
  }
};

const handleSubmit = (event) => {
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
    cardContainer.innerHTML = cardHtml + cardContainer.innerHTML;

    addButton.disabled = true;
  }
};

const handleEditSubmit = (event, id) => {
  event.preventDefault();
  const cardToEdit = document.getElementById(`card-${id}`);
  const input = document.querySelector(
    `div#card-${id} > form > .edit-item-input`
  );
  const item = itens.find((i) => String(i.id) === String(id));
  const newItem = {
    ...item,
    description: input.value.trim(),
  };

  const index = itens.indexOf(item);
  itens[index] = newItem;

  cardToEdit.outerHTML = renderCardItem(newItem);
};

const handleDelete = (id) => {
  const index = itens.indexOf(id);
  if (index !== -1) itens.splice(index, 1);

  const cardToRemove = document.getElementById(`card-${id}`);
  if (cardToRemove) cardToRemove.remove();
};

const handleEdit = (id) => {
  const cardToEdit = document.getElementById(`card-${id}`);
  cardToEdit.innerHTML = renderEditCardItem({
    id,
    description: cardToEdit.querySelector("h5").textContent,
    status: cardToEdit.querySelector("select").value,
  });
};

const handleSelectChange = (event, id) => {
  const input = event.target.value;
  const item = itens.find((i) => String(i.id) === String(id));
  const newItem = {
    ...item,
    status: input,
  };

  const index = itens.indexOf(item);
  itens[index] = newItem;
  console.log(itens);
};

initialData();
