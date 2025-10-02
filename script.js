const form = document.getElementById("form");
const taskInput = document.getElementById("task");
const dateInput = document.getElementById("date");
const list = document.getElementById("list");
const filter = document.getElementById("filter");
const notesArea = document.getElementById("notesArea");

// Update catatan otomatis
function updateNotes() {
    let tasks = [];
    list.querySelectorAll("li").forEach(item => {
        const text = item.querySelector("span").innerText;
        if (item.classList.contains("done")) {
            tasks.push("✔️ " + text);
        } else {
            tasks.push("❌ " + text);
        }
    });
    notesArea.value = tasks.join("\n");
}

// Tambah task
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    const taskDate = dateInput.value;

    if (taskText === "" || taskDate === "") {
        alert("Isi kegiatan dan tanggal!");
        return;
    }

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

// Event delete / complete
list.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.parentElement.remove();
    }
    if (e.target.classList.contains("complete")) {
        e.target.parentElement.parentElement.classList.toggle("done");
    }
    updateNotes();
});

// Filter
filter.addEventListener("change", function() {
    const items = list.querySelectorAll("li");
    items.forEach(function(item) {
        switch (filter.value) {
            case "all":
                item.style.display = "flex";
                break;
            case "done":
                item.style.display = item.classList.contains("done") ? "flex" : "none";
                break;
            case "undone":
                item.style.display = item.classList.contains("done") ? "none" : "flex";
                break;
        }
    });
});
