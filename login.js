var LoginForm = (function() {
    var username = document.getElementById("username");
    var password = document.getElementById("password");

    function generateAccount() {
        localStorage.setItem("username", username.value);
        localStorage.setItem("password", password.value);
    }

    function checkAccount() {
        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password")
    }
})();