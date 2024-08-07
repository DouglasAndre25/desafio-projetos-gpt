const itens = [];

const cardContainer = document.querySelector("#cards");
const addButton = document.querySelector(".new-item-button");
const filterRadioOptions = document.querySelectorAll(".options-item > input");

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

const initialData = (data) => {
  const tasks = data ?? itens;
  const render = tasks.map((item) => renderCardItem(item)).join(" ");
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
};

const handleFilterChange = (value) => {
  if (value !== "none") {
    const data = itens.filter((item) => item.status === value);
    initialData(data);
  } else {
    initialData();
  }
};

initialData();

filterRadioOptions.forEach((radio) =>
  radio.addEventListener("change", () => handleFilterChange(radio.value))
);
