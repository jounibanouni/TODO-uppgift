var loggedinUserId = undefined;

var TODOStorage = (function () {
    var todos = [];

    function init() {
        const lsTodos = localStorage.getItem("TODOS");
        todos = JSON.parse(lsTodos);

        if (todos === null) {
            todos = [];
        }
    }

    //Create TODO
    function createNewTodo(userid, done, description){
        //Get maxID in todos
        let maxId = 0;
        for(const i in todos){
            const todo = todos[i];
            if(todo.id > maxId){
                maxId = todo.id;
            }
        }
        //Create TODO-object
        const todo = {
            userid: userid,
            id: maxId+1,
            done: done,
            description: description
        }

        //Save new TODO to list
        todos.push(todo);

        //Save list to local storage
        saveChanges();
    }

    function saveChanges(){
        const lsTodos = JSON.stringify(todos);
        localStorage.setItem("TODOS", lsTodos);
    }

    //List TODOs
    function listTodos(){
        return todos;
    }

    //Read TODO by id
    function getTodoById(id){
        for(const i in todos){
            const todo = todos[i];

            if (todo.id === id){
                return todo;
            }
        }

        return null;
    }

    //Update TODO
    function updateTodo(id, done, description){
        for(const i in todos){

            //Update if id is found
            if(todos[i].id === id){
                todos[i].done = done;
                todos[i].description = description;
            }
        }

        saveChanges();
    }

    //Delete TODO
    function deleteTodoById(id){
        for(const i in todos){
            const todo = todos[i];

            if(todo.id === id){
                todos.splice(i, 1);
                break;
            }
        }

        saveChanges();
    }

    return { 
        init,
        createNewTodo,
        listTodos,
        getTodoById,
        updateTodo,
        deleteTodoById
    }

})();

var UserStorage = (function(){
    var users = [];
    

    function init() {
        const lsUsers = localStorage.getItem("Users");
        users = JSON.parse(lsUsers);

        if (users === null) {
            users = [];
        }
    }

    function createNewUser(username, password){
        //Get maxID in todos
        let maxId = 0;
        for(const i in users){
            const user = users[i];
            if(user.id > maxId){
                maxId = user.id;
            }
        }
        //Create TODO-object
        const user = {
            id: maxId+1,
            username: username,
            password: password
        }

        //Save new TODO to list
        users.push(user);

        //Save list to local storage
        saveChanges();
    }

    function saveChanges(){
        const lsUsers = JSON.stringify(users);
        localStorage.setItem("Users", lsUsers);
    }

    function showUsers(){
        return users;
    }

    function checkUser(username, password){
        for (const i in users){
            if(username === users[i].username){
                if(users[i].password === password){
                    loggedinUserId = users[i].id;
                    loggedInScreen();
                    hideCreateTodo();
                    alert("Congrats you are now logged in");
                }
                else if(users[i].password !== password){
                    alert("Wrong password, try again");
                }
            }
        }
        console.log(loggedinUserId);
    }

    return{
        init,
        createNewUser,
        showUsers,
        checkUser
    }
})();

var EventHandlers = (function(){
    function init(){
        const submitNewUser = document.getElementById("submit-user-button");
        submitNewUser.addEventListener("click", createNewUserInfo);

        const loginButton = document.getElementById("login-button");
        loginButton.addEventListener("click", loginUser);

        const createNewUserButton = document.getElementById("create-new-user-button");
        createNewUserButton.addEventListener("click", createNewUserScreen);

        const createNewTodoButton = document.getElementById("submit-new-todo");
        createNewTodoButton.addEventListener("click", createNewTodoEntry);

        //window.addEventListener("onload", hideCreateTodo)

    }

    function createNewUserInfo(){
        const usernameInput = document.getElementById("username-input");
        const passwordInput = document.getElementById("password-input");

        const usernameInputString = usernameInput.value;
        const passwordInputString = passwordInput.value;

        UserStorage.createNewUser(usernameInputString, passwordInputString);

    }

    function loginUser(){
        const usernameLoginInput = document.getElementById("username-login-input");
        const passwordLoginInput = document.getElementById("password-login-input");

        const usernameLoginValue = usernameLoginInput.value;
        const passwordLoginvalue = passwordLoginInput.value;

        UserStorage.checkUser(usernameLoginValue, passwordLoginvalue);

    }

    function createNewUserScreen(){
        const loginDivBox = document.getElementById("login-box");
        const createNewUserBox = document.getElementById("create-new-user-box");

        loginDivBox.style.display = "none";
        createNewUserBox.style.display = "block";

    }

    function createNewTodoEntry(){
        const descriptionInput = document.getElementById("new-todo-description");
        descriptionInputString = descriptionInput.value;
        if(loggedinUserId !== undefined){
            TODOStorage.createNewTodo(loggedinUserId, false, descriptionInputString)
        }
        else{
            alert("You are not logged in!");
        }

        
    }


    return {init}
})();

function loggedInScreen(){
    const loginDivBox = document.getElementById("login-box");
    loginDivBox.style.display = "none";
    TODOStorage.listTodos();
}

function hideCreateTodo(){
    const loggedinBox = document.getElementById("loggedin-box");
    loggedinBox.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
    TODOStorage.init();
    UserStorage.init();
    EventHandlers.init();
});