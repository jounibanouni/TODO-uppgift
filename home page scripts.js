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

function clearAllEntries(){
    localStorage.clear();
    location.reload();
}

const addItemClick = document.getElementById("add-item");
addItemClick.addEventListener("click", addItemOnClick);

const overviewClick = document.getElementById("overview");
overviewClick.addEventListener("click", overviewOnClick);

const clearAllClick = document.getElementById("clear-all-button");
clearAllClick.addEventListener("click", clearAllEntries)

function overviewOnClick() {
    window.location.href = 'home-page.html';
}

function addItemOnClick() {
    window.location.href = 'add-item-page.html';
}

window.addEventListener("DOMContentLoaded", addPostToListShow);