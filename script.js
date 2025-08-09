// Run after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList  = document.getElementById('task-list');

  // Function to add a new task
  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
      alert('Please enter a task');
      return;
    }

    // Create li for the task
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn'); // ✅ using classList.add

    // Remove task on click
    removeBtn.onclick = function () {
      taskList.removeChild(li);
    };

    // Append button to li, li to list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear the input
    taskInput.value = '';
    taskInput.focus();
  }

  // Add task on button click
  addButton.addEventListener('click', addTask);

  // Add task on Enter key
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
