"use strict";
// DOM elements
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
// Utility function to create a task element
function createTaskElement(taskText) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.textContent = taskText;
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-task");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-task");
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
    addTaskAnimation(taskItem);
    return taskItem;
}
// Add task animation
function addTaskAnimation(taskItem) {
    taskItem.style.opacity = "0";
    taskItem.style.transform = "translateY(-10px)";
    setTimeout(() => {
        taskItem.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        taskItem.style.opacity = "1";
        taskItem.style.transform = "translateY(0)";
    }, 50);
}
// Event: Add Task
addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (!taskText)
        return;
    const taskElement = createTaskElement(taskText);
    taskList.appendChild(taskElement);
    taskInput.value = "";
});
// Event: Task Interactions (Edit/Delete)
taskList.addEventListener("click", (event) => {
    const target = event.target;
    const taskItem = target.parentElement;
    if (target.classList.contains("delete-task")) {
        taskItem.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        taskItem.style.opacity = "0";
        taskItem.style.transform = "translateX(20px)";
        setTimeout(() => taskItem.remove(), 300);
    }
    if (target.classList.contains("edit-task")) {
        const newTaskText = prompt("Edit task:", taskItem.firstChild.textContent || "");
        if (newTaskText) {
            taskItem.firstChild.textContent = newTaskText.trim();
        }
    }
});
