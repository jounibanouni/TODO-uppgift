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
    function createNewTodo(userid, done, description) {
        //Get maxID in todos
        let maxId = 0;
        for (const i in todos) {
            const todo = todos[i];
            if (todo.id > maxId) {
                maxId = todo.id;
            }
        }
        //Create TODO-object
        const todo = {
            userid: userid,
            id: maxId + 1,
            done: done,
            description: description
        }

        //Save new TODO to list
        todos.push(todo);

        //Save list to local storage
        saveChanges();
    }

    function saveChanges() {
        const lsTodos = JSON.stringify(todos);
        localStorage.setItem("TODOS", lsTodos);
    }

    //List TODOs
    function listTodos() {
        return todos;
    }

    //Read TODO by id
    function getTodoById(id) {
        for (const i in todos) {
            const todo = todos[i];

            if (todo.id === id) {
                return todo;
            }
        }

        return null;
    }

    function removeTodoByCheckbox() {

        for (const i in todos) {
            const todo = todos[i];

            if (todo.userid === loggedinUserId) {

                if (document.getElementById("checkBox" + todo.id).checked) {
                    //alert(todo.id);
                    TODOStorage.deleteTodoById(todo.id);
                    continue;
                }
            }

        }

    }

    function listTodosByUser(loggedinUserId) {
        const listShowTodos = document.getElementById("show-todos");
        for (const i in todos) {
            const todo = todos[i];
            if (loggedinUserId === todos[i].userid) {
                listShowTodos.innerHTML += "<li class='list-class'id='listInput" + todo.id + "'><input type='checkbox' id='checkBox" + todo.id + "' >" + todo.description + "</li>";
            }
        }
    }

    //Update TODO
    function updateTodo(id, done, description) {
        for (const i in todos) {

            //Update if id is found
            if (todos[i].id === id) {
                todos[i].done = done;
                todos[i].description = description;
            }
        }

        saveChanges();
    }

    //Delete TODO
    function deleteTodoById(id) {
        for (const i in todos) {
            const todo = todos[i];

            if (todo.id === id) {
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
        deleteTodoById,
        listTodosByUser,
        removeTodoByCheckbox
    }

})();

var UserStorage = (function () {
    var users = [];


    function init() {
        const lsUsers = localStorage.getItem("Users");
        users = JSON.parse(lsUsers);

        if (users === null) {
            users = [];
        }
    }

    function createNewUser(username, password) {
        //Get maxID in todos
        for (const i in users){
            if(users[i].username === username){
                alert("That username is already taken!");
                return;
            }
        }
        let maxId = 0;
        for (const i in users) {
            const user = users[i];
            if (user.id > maxId) {
                maxId = user.id;
            }
        }
        //Create TODO-object
        const user = {
            id: maxId + 1,
            username: username,
            password: password
        }

        //Save new TODO to list
        users.push(user);

        //Save list to local storage
        saveChanges();
    }

    function saveChanges() {
        const lsUsers = JSON.stringify(users);
        localStorage.setItem("Users", lsUsers);
    }

    function showUsers() {
        return users;
    }

    //Log in function
    function checkUser(username, password) {
        let foundUser = false;
        for (const i in users) {
            if (username === users[i].username) {
                foundUser = true;
                if (users[i].password === password) {
                    loggedinUserId = users[i].id;
                    loggedInScreen();
                    TODOStorage.listTodosByUser(loggedinUserId);
                    alert("Congrats you are now logged in");
                }
                else if (users[i].password !== password) {
                    alert("Wrong password or username");
                }
            }
            if (username !== users[i].username){
                continue;
            }
        }

        if (foundUser === false){
            alert("Could not find user");
        }
        console.log(loggedinUserId);
    }

    return {
        init,
        createNewUser,
        showUsers,
        checkUser
    }
})();

var EventHandlers = (function () {
    function init() {
        const submitNewUser = document.getElementById("submit-user-button");
        submitNewUser.addEventListener("click", createNewUserInfo);

        const loginButton = document.getElementById("login-button");
        loginButton.addEventListener("click", loginUser);

        const createNewUserButton = document.getElementById("create-new-user-button");
        createNewUserButton.addEventListener("click", createNewUserScreen);

        const createNewTodoButton = document.getElementById("submit-new-todo");
        createNewTodoButton.addEventListener("click", createNewTodoEntry);

        const clearTodoButton = document.getElementById("clear-todo");
        clearTodoButton.addEventListener("click", clearTodoById);

        const logoutButton = document.getElementById("logout-button");
        logoutButton.addEventListener("click", logOutFromPage);

        //window.addEventListener("onload", hideCreateTodo)

    }

    function clearTodoById() {
        TODOStorage.removeTodoByCheckbox();
        clearPage();

    }

    function logOutFromPage() {
        location.reload();
    }

    function createNewUserInfo() {
        const usernameInput = document.getElementById("username-input");
        const passwordInput = document.getElementById("password-input");

        const usernameInputString = usernameInput.value;
        const passwordInputString = passwordInput.value;

        UserStorage.createNewUser(usernameInputString.toLowerCase(), passwordInputString);
        location.reload();

    }

    function loginUser() {
        const usernameLoginInput = document.getElementById("username-login-input");
        const passwordLoginInput = document.getElementById("password-login-input");

        const usernameLoginValue = usernameLoginInput.value;
        const passwordLoginvalue = passwordLoginInput.value;

        UserStorage.checkUser(usernameLoginValue.toLowerCase(), passwordLoginvalue);

    }

    function createNewUserScreen() {
        const loginDivBox = document.getElementById("login-box");
        const createNewUserBox = document.getElementById("create-new-user-box");

        loginDivBox.style.display = "none";
        createNewUserBox.style.display = "block";

    }

    function createNewTodoEntry() {
        const descriptionInput = document.getElementById("new-todo-description");

        descriptionInputString = descriptionInput.value;
        if(descriptionInputString === ""){
            return;
        }
        TODOStorage.createNewTodo(loggedinUserId, false, descriptionInputString)
        descriptionInput.value = "";

        clearPage();
    }


    return { init }
})();

function loggedInScreen() {
    const loginDivBox = document.getElementById("login-box");
    const loggedinBox = document.getElementById("loggedin-box");
    const logoutButton = document.getElementById("logout-button");
    logoutButton.style.display = "block";
    loggedinBox.style.display = "block";
    loginDivBox.style.display = "none";
}


function clearPage() {
    const listShowTodos = document.getElementById("show-todos");
    listShowTodos.innerHTML = "";
    TODOStorage.listTodosByUser(loggedinUserId);
}

document.addEventListener("DOMContentLoaded", function () {
    TODOStorage.init();
    UserStorage.init();
    EventHandlers.init();
});