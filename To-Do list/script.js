document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const addTaskButton = document.getElementById("addTask");
    const taskCounter = document.getElementById("taskCounter");
    const clearAllButton = document.getElementById("clearAll");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const taskCategory = document.getElementById("taskCategory");
    const taskPriority = document.getElementById("taskPriority");
    const dueDate = document.getElementById("dueDate");
    const progressBar = document.getElementById("progressBar");
    const searchTask = document.getElementById("searchTask");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function updateCounter() {
        taskCounter.textContent = `Tasks Left: ${tasks.length}`;
        progressBar.style.width = `${(tasks.length / 10) * 100}%`;
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function addTask() {
        if (taskInput.value.trim() === "") return;

        const taskText = taskInput.value;
        const category = taskCategory.value;
        const priority = taskPriority.value;
        const due = dueDate.value;

        const li = document.createElement("li");
        li.classList.add(priority.toLowerCase());
        li.innerHTML = `
            <span>${taskText} <small>(${category}, Due: ${due})</small></span>
            <div>
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">❌</button>
            </div>
        `;

        // Delete Task
        li.querySelector(".delete-btn").addEventListener("click", () => {
            taskList.removeChild(li);
            tasks = tasks.filter(task => task.text !== taskText);
            updateCounter();
            saveTasks();
        });

        // Edit Task
        li.querySelector(".edit-btn").addEventListener("click", () => {
            const newText = prompt("Edit task:", taskText);
            if (newText) {
                li.querySelector("span").innerHTML = `${newText} <small>(${category}, Due: ${due})</small>`;
            }
        });

        taskList.appendChild(li);
        tasks.push({ text: taskText, category, priority, due });
        updateCounter();
        saveTasks();
        taskInput.value = "";
    }

    // Search Tasks
    searchTask.addEventListener("input", () => {
        const filter = searchTask.value.toLowerCase();
        document.querySelectorAll("li").forEach(li => {
            li.style.display = li.textContent.toLowerCase().includes(filter) ? "flex" : "none";
        });
    });

    addTaskButton.addEventListener("click", addTask);
    clearAllButton.addEventListener("click", () => {
        taskList.innerHTML = "";
        tasks = [];
        updateCounter();
        saveTasks();
    });

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });

    updateCounter();
});