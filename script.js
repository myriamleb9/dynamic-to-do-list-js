// Run after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList  = document.getElementById('task-list');

  // In‑memory copy of tasks to keep storage updates simple
  let tasks = [];

  // Helpers for Local Storage
  const getStoredTasks = () => JSON.parse(localStorage.getItem('tasks') || '[]');
  const saveTasks      = arr => localStorage.setItem('tasks', JSON.stringify(arr));

  // Create and append a task <li>. If `save` is true, persist to Local Storage.
  function addTask(taskText, save = true) {
    // If called from UI without arg, read from input
    const text = (typeof taskText === 'string' ? taskText : taskInput.value).trim();

    if (text === '') {
      // Only alert when user tries to add an empty task
      if (taskText === undefined) alert('Please enter a task');
      return;
    }

    // Build <li>
    const li = document.createElement('li');
    li.textContent = text;

    // Build Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn'); // required by spec

    // Remove handler: update DOM + storage
    removeBtn.onclick = function () {
      taskList.removeChild(li);
      const idx = tasks.indexOf(text); // remove first matching occurrence
      if (idx > -1) {
        tasks.splice(idx, 1);
        saveTasks(tasks);
      }
    };

    // Assemble and attach
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Persist if needed
    if (save) {
      tasks.push(text);
      saveTasks(tasks);
    }

    // Clear input
    taskInput.value = '';
    taskInput.focus();
  }

  // Load tasks from Local Storage and render them
  function loadTasks() {
    tasks = getStoredTasks();
    tasks.forEach(storedText => addTask(storedText, false)); // don't re-save while loading
  }

  // Wire up UI events
  addButton.addEventListener('click', () => addTask());
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') addTask();
  });

  // Initialize app by loading saved tasks
  loadTasks();
});
