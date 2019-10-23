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