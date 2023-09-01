// Setting variables
let todoItems = []
const todoInput = document.querySelector('.todo-input')
const completedTodoDiv = document.querySelector('.completed-todos')
const inCompletedTodoDiv = document.querySelector('.incompleted-todos')
const audio = new Audio('sc/pop-39222.mp3')

//Get todo list on first boot
window.onload = () => {
    let storageTodoItems = localStorage.getItem('todoItems')
    if (storageTodoItems !== null) {
        todoItems = JSON.parse(storageTodoItems)
    }
    render()
}

// Listen for when a key is released while typing in the todoInput box
todoInput.onkeyup = ((e) => {

    // Get what's typed into the box and remove any spaces at the beginning
    let value = e.target.value.replace(/^\s+/, "");

    // Check if something is typed and if the key pressed is "Enter"
    if (value && e.keyCode === 13) {

        // Add what's typed as a task
        addTodo(value);

        // Clear what's typed in the box
        todoInput.value = '';

        // Put the cursor back into the box for typing convenience
        todoInput.focus();
    }
});


// Define a function called addTodo that takes a parameter called text
function addTodo(text) {
    // Create a new task object with an id, the provided text, and completion status
    todoItems.push({
        id: Date.now(),   // Use the current time as a unique identifier for the task
        text,             // Save the provided text as the task's description
        completed: false  // Set the completion status of the task to "not completed"
    });

    // Call the saveAndRender function to save changes and update the display
    saveAndRender();
}


//Remove function
function removeTodo(id) {

}

//Mark as completed
function markAsCompleted(id) {

}

//Mark as inCompleted(id)
function markAsIncompleted(id) {

}

//Save in local storage
function saveInLocStor() {

}

// Render function to display tasks on the page
function render() {
    // Separate tasks into completed and incompleted lists
    let inCompletedTodos = todoItems.filter(item => !item.completed);
    let completedTodos = todoItems.filter(item => item.completed);

    // Clear previous content in the display areas
    completedTodoDiv.innerHTML = '';
    inCompletedTodoDiv.innerHTML = '';

    // Display incompleted tasks or a message if none exist
    if (inCompletedTodos.length > 0) {
        inCompletedTodos.forEach(todo => {
            inCompletedTodoDiv.append(createTodoElement(todo));
        });
    } else {
        inCompletedTodoDiv.innerHTML = `<div class="empty">No incomplete tasks</div>`;
    }

    // Display completed tasks and the count of completed vs. incompleted tasks
    if (completedTodos.length > 0) {
        completedTodoDiv.innerHTML = `<div class="completed-title">Completed (${completedTodos.length} / ${inCompletedTodos.length})</div>`;

        completedTodos.forEach(todo => {
            completedTodoDiv.append(createTodoElement(todo));
        });
    }
}


//save and render
function saveAndRender() {
    save()
    render()
}

//create todo list item
function createTodoElement(todo) {

}