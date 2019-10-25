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
