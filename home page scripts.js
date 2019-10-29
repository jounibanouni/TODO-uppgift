
function getPost(current){
    const postString = localStorage.getItem(current);
    const post = JSON.parse(postString);

    return post;
}

function addPostToListShow(){
    const todoList = document.getElementById("todo-list-show");
    for(let i = 0; i < localStorage.length; i++){
        post = getPost(i);
        todoList.innerHTML += "<li>" + post.title + "| Priority: " + post.priority + "| Deadline:" + post.deadline + "</li>";
    }
    
}

const addItemClick = document.getElementById("add-item");
addItemClick.addEventListener("click", addItemOnClick);

const checkListClick = document.getElementById("check-list");
checkListClick.addEventListener("click", checkListOnClick);

const overviewClick = document.getElementById("overview");
overviewClick.addEventListener("click", overviewOnClick);

const createAccountClick = document.getElementById("create-account-button");
createAccountClick.addEventListener("click", createAccountOnClick);

function overviewOnClick() {
    window.location.href = 'home-page.html';
}

function checkListOnClick() {
    window.location.href = 'check-list.html';
}

function addItemOnClick() {
    window.location.href = 'add-item-page.html';
}

function createAccountOnClick() {
    window.location.href = 'create-account-page.html';
}

window.addEventListener("DOMContentLoaded", addPostToListShow);