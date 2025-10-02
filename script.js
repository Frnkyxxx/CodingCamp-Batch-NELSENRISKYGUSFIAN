const form = document.getElementById("form");
const taskInput = document.getElementById("task");
const dateInput = document.getElementById("date");
const list = document.getElementById("list");
const filter = document.getElementById("filter");
const notesArea = document.getElementById("notesArea");

function updateNotes() {
  let tasks = [];
  list.querySelectorAll("li").forEach(item => {
    const text = item.querySelector("span").innerText;
    tasks.push((item.classList.contains("done") ? "✔️ " : "❌ ") + text);
  });
  notesArea.value = tasks.join("\n");
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value;
  if (!taskText || !taskDate) return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText} (${taskDate})</span>
    <div>
      <button class="complete">✓</button>
      <button class="delete">✕</button>
    </div>
  `;
  list.appendChild(li);
  updateNotes();
  taskInput.value = "";
  dateInput.value = "";
});

list.addEventListener("click", function(e) {
  if (e.target.classList.contains("delete")) {
    e.target.closest("li").remove();
  } else if (e.target.classList.contains("complete")) {
    e.target.closest("li").classList.toggle("done");
  }
  updateNotes();
});

filter.addEventListener("change", function() {
  list.querySelectorAll("li").forEach(item => {
    if (filter.value === "all") item.style.display = "flex";
    if (filter.value === "done") item.style.display = item.classList.contains("done") ? "flex" : "none";
    if (filter.value === "undone") item.style.display = item.classList.contains("done") ? "none" : "flex";
  });
});

