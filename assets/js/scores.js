let highscoresOl = document.querySelector("#highscores");
let clearScore = document.querySelector("#clear");
const localArray = JSON.parse(localStorage.getItem("user"))
localArray.forEach(element => {
    let highscoresLi = document.createElement("li");
    highscoresLi.innerText = "Score: " + element.currentScore + ", User: " + element.userName;
    highscoresOl.appendChild(highscoresLi);
    clearScore.addEventListener("click", function(event){
        event.preventDefault();
        localStorage.clear();
        highscoresOl.removeChild(highscoresLi);
    });
})