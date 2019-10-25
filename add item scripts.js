var EventHandlers = (function(){
    function init(){
        const toDoSubmitButton = document.getElementById("submit-todo-button");
        toDoSubmitButton.addEventListener("click", submitTodo)  

    }

    function submitTodo(){
        const toDoInput = document.getElementById("todo-input")
        const priorityInput = document.getElementsByClassName("priority-option");
        const deadlineInput = document.getElementById("deadline-input");

        DocumentEdit.addTodoInput(toDoInput.value, priorityInput.value, deadlineInput.value);
    }

    return{init}
})();

var DocumentEdit = (function(){
    function addTodoInput(text, priority, deadline){
        const todoList = document.getElementById("todo-list");

        todoList.innerHTML += "<li>" + text + "-" + "-" + priority + "-" + deadline + "</li>";
        
    }

    return{addTodoInput}
})();

window.addEventListener("DOMContentLoaded", EventHandlers.init);

const addItemClick = document.getElementById("add-item");
addItemClick.addEventListener("click", addItemOnClick);

const checkListClick = document.getElementById("check-list");
checkListClick.addEventListener("click", checkListOnClick);

const overviewClick = document.getElementById("overview");
overviewClick.addEventListener("click", overviewOnClick);

function overviewOnClick() {
    window.location.href = 'home-page.html'
}

function checkListOnClick() {
    window.location.href = 'check-list.html'
}

function addItemOnClick() {
    window.location.href = 'add-item-page.html'
}