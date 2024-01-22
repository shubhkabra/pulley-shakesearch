const Controller = {
  page: 0,
  search: () => {
    const form = document.getElementById("form");
    const data = Object.fromEntries(new FormData(form));
    const response = fetch(`/search?q=${data.query}&page=${Controller.page}`).then((response) => {
      response.json().then((results) => {
        Controller.updateTable(results, Controller.page === 0);
        Controller.page++;
      });
    });
  },

  updateTable: (results, clearTable) => {
    const table = document.getElementById("table-body");
    if (clearTable) {
      table.innerHTML = '';
    }
    for (let result of results) {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.textContent = result;
      row.appendChild(cell);
      table.appendChild(row);
    }
  },
};

const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  Controller.page = 0;
  Controller.search();
});

const loadMore = document.getElementById("load-more");
loadMore.addEventListener("click", Controller.search);

