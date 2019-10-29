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

        if (toDoInput.value && deadlineInput.value !== "" && priority !== 0){
            LocalStorageHelper.savePost(post);
        }
        else{
            alert("Please enter value on all of the fields");
        }
        //DocumentEdit.addTodoInput(toDoInput.value, priority, deadlineInput.value);
        
    }

    return { init }
})();



var LocalStorageHelper = (function () { 

    if(localStorage.length === 0){
        var postSlot = 0;
    }
    else{
        postSlot = localStorage.length;
    }
    

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