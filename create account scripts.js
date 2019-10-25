const goBackButton = document.getElementById("overview");
goBackButton.addEventListener("click", onGoBackButtonClick);

function onGoBackButtonClick(){
    window.location.href = 'home-page.html'
}