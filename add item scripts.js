var EventHandlers = (function () {
    function init() {
        const toDoSubmitButton = document.getElementById("submit-todo-button");
        toDoSubmitButton.addEventListener("click", submitTodo)

    }

    function submitTodo() {
        const toDoInput = document.getElementById("todo-input")
        const priorityInput = document.getElementsByClassName("priority-option");
        const deadlineInput = document.getElementById("deadline-input");
        var priority = 0;


        for (const i in priorityInput) {
            if (priorityInput[i].checked === true) {
                priority = priorityInput[i].defaultValue;
                console.log(priority);
            }
        }
        var post = { title: toDoInput.value, priority: priority, deadline: deadlineInput.value }
        let postArray = [];


        DocumentEdit.addTodoInput(toDoInput.value, priority, deadlineInput.value);
        LocalStorageHelper.savePost(post);
    }

    return { init }
})();

var DocumentEdit = (function () {
    function addTodoInput(text, priority, deadline) {
        const todoList = document.getElementById("post-list");

        todoList.innerHTML += "<li>" + text + "-" + priority + "-" + deadline + "</li>";

    }

    return { addTodoInput }
})();

var LocalStorageHelper = (function () {

    let postSlot = 0;

    function savePost(post) {
        const postString = JSON.stringify(post);        
        localStorage.setItem(postSlot, postString);
        postSlot++;
    }

    return { savePost }

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