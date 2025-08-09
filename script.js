// Run everything after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList  = document.getElementById('task-list');

  /**
   * addTask
   * - Reads and trims the input
   * - Validates non-empty text
   * - Creates <li> + "Remove" button
   * - Appends to the task list
   * - Clears input
   */
  function addTask() {
    const taskText = taskInput.value.trim();

    // If empty, gently bail (alert only on user-triggered attempts)
    if (taskText === '') {
      if (document.activeElement === addButton || document.activeElement === taskInput) {
        alert('Please enter a task');
      }
      return;
    }

    // Create list item
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // Remove handler
    removeBtn.onclick = function () {
      taskList.removeChild(li);
    };

    // Assemble + attach
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Reset input for the next task
    taskInput.value = '';
    taskInput.focus();
  }

  // Add Task on button click
  addButton.addEventListener('click', addTask);

  // Add Task on Enter key
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Invoke once on load (no alert since input is empty)
  addTask();
});
