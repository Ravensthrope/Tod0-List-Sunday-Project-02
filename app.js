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
    todoItems = todoItems.filter(todo => todo.id !== Number(id))
    saveAndRender()
}

//Mark as completed
function markAsCompleted(id) {
    todoItems = todoItems.filter(todo => {
        if(todo.id === Number(id)) {
            todo.completed = true
        }
        return todo
    })
    audio.play()
    saveAndRender()
}

//Mark as inCompleted(id)
function markAsIncompleted(id) {
    todoItems = todoItems.filter(todo => {
        if(todo.id === Number(id)) {
            todo.completed = false
        }
        return todo
    })
    saveAndRender()
}

//Save in local storage
function save() {
    localStorage.setItem('todoItems', JSON.stringify(todoItems))
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
    //Creating todo list container
    const todoDiv = document.createElement('div')
    todoDiv.setAttribute('data-id', todo.id)
    todoDiv.className = "todo-item"

    //Creating todo item text
    const todoTextSpan = document.createElement('span')
    todoTextSpan.innerHTML = todo.text

    //Checkbox for list
    const todoInputCheckbox = document.createElement('input')
    todoInputCheckbox.type = 'checkbox'
    todoInputCheckbox.checked = todo.completed
    todoInputCheckbox.onclick = (e) => {
        let id = e.target.closest('.todo-item').dataset.id
        e.target.checked ? markAsCompleted(id) : markAsIncompleted(id)
    }

    //Delete button for list
    const todoRemoveBtn = document.createElement('a')
    todoRemoveBtn.href = '#'
    todoRemoveBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M18 6l-12 12"></path>
    <path d="M6 6l12 12"></path>
 </svg>`
    todoRemoveBtn.onclick = (e) => {
        let id = e.target.closest('.todo-item').dataset.id
        removeTodo(id)
    }
    todoTextSpan.prepend(todoInputCheckbox)
    todoDiv.appendChild(todoTextSpan)
    todoDiv.appendChild(todoRemoveBtn)

    return todoDiv
}