const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

const modalOverlay = document.createElement("div");
modalOverlay.id = "status-modal-overlay";
modalOverlay.style.display = "none";
modalOverlay.style.position = "fixed";
modalOverlay.style.top = "0";
modalOverlay.style.left = "0";
modalOverlay.style.width = "100%";
modalOverlay.style.height = "100%";
modalOverlay.style.backgroundColor = "rgba(0,0,0,0.4)";
modalOverlay.style.justifyContent = "center";
modalOverlay.style.alignItems = "center";
modalOverlay.style.zIndex = "10000";
modalOverlay.style.cursor = "pointer";

const modalContent = document.createElement("div");
modalContent.id = "status-modal-content";

modalOverlay.appendChild(modalContent);
document.body.appendChild(modalOverlay);

let currentStatusButton = null;

function createTaskElement(taskText) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");

  const textSpan = document.createElement("span");
  textSpan.classList.add("task-text");
  textSpan.textContent = taskText;

  const statusBtn = document.createElement("button");
  statusBtn.classList.add("status-btn", "edit-task");
  statusBtn.textContent = "Status";
  statusBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentStatusButton = statusBtn;
    openStatusModal();
  });

  const noteBtn = document.createElement("button");
  noteBtn.classList.add("note-button");
  noteBtn.textContent = "Note";
  noteBtn.addEventListener("click", () => openNotePopup(taskItem));

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-task");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-task");

  const rightBox = document.createElement("div");
  rightBox.style.display = "flex";
  rightBox.style.gap = "10px";
  rightBox.style.flexGrow = "1";
  rightBox.style.justifyContent = "center";

  rightBox.appendChild(statusBtn);
  rightBox.appendChild(noteBtn);
  rightBox.appendChild(editButton);
  rightBox.appendChild(deleteButton);

  taskItem.appendChild(checkbox);
  taskItem.appendChild(textSpan);
  taskItem.appendChild(rightBox);

  addTaskAnimation(taskItem);
  return taskItem;
}

function openStatusModal() {
  modalContent.innerHTML = "";

  const statuses = [
    { label: "Not Completed", icon: "🟥" },
    { label: "In Progress", icon: "🟨" },
    { label: "Completed", icon: "🟩" }
  ];

  statuses.forEach((status) => {
    const option = document.createElement("div");
    option.style.cursor = "pointer";
    option.style.padding = "10px";
    option.style.fontSize = "18px";
    option.style.display = "flex";
    option.style.alignItems = "center";
    option.style.gap = "10px";
    option.textContent = `${status.icon} ${status.label}`;
    option.addEventListener("click", () => {
      if (currentStatusButton) {
        currentStatusButton.textContent = `${status.icon} ${status.label}`;
      }
      closeStatusModal();
    });
    modalContent.appendChild(option);
  });

  modalOverlay.style.display = "flex";
}

function closeStatusModal() {
  modalOverlay.style.display = "none";
  currentStatusButton = null;
}

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closeStatusModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.style.display === "flex") {
    closeStatusModal();
  }
});

function addTaskAnimation(taskItem) {
  taskItem.style.opacity = "0";
  taskItem.style.transform = "translateY(-10px)";
  setTimeout(() => {
    taskItem.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    taskItem.style.opacity = "1";
    taskItem.style.transform = "translateY(0)";
  }, 50);
}

function openNotePopup(taskItem) {
  const popup = document.createElement("div");
  popup.className = "note-popup";

  const title = document.createElement("h3");
  title.textContent = "Add a Note:";
  popup.appendChild(title);

  const textarea = document.createElement("textarea");
  textarea.value = taskItem.getAttribute("data-note") || "";
  popup.appendChild(textarea);

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.onclick = () => {
    taskItem.setAttribute("data-note", textarea.value);
    document.body.removeChild(popup);
  };
  popup.appendChild(saveBtn);

  document.body.appendChild(popup);
}

addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const taskElement = createTaskElement(taskText);
  taskList.appendChild(taskElement);
  taskInput.value = "";
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTaskButton.click();
  }
});

taskList.addEventListener("click", (event) => {
  const target = event.target;
  const taskItem = target.closest("li");

  if (target.classList.contains("delete-task")) {
    taskItem.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    taskItem.style.opacity = "0";
    taskItem.style.transform = "translateX(20px)";
    setTimeout(() => taskItem.remove(), 300);
  }

  if (target.classList.contains("edit-task") && !target.classList.contains("status-btn")) {
    const textSpan = taskItem.querySelector(".task-text");
    const newText = prompt("Edit task:", textSpan.textContent || "");
    if (newText) {
      textSpan.textContent = newText.trim();
    }
  }
});
