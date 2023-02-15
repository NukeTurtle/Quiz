// define variables for various DOM elements
let questionsDiv = document.querySelector("#questions");
let startButton = document.getElementById('start');
let timerElement = document.getElementById('time');
let startScreen = document.querySelector("#start-screen");
let questionDiv = document.querySelector("#questions");
let endScreen = document.querySelector("#end-screen");
let finalScore = document.querySelector("#final-score");
let questionTitle = document.querySelector("#question-title");
let choicesDiv = document.querySelector("#choices");
let timer = 90;
let newTimer;

// define start timer function
function startTimer() {
    newTimer = setInterval(function () {
        timer--;
        timerElement.innerText = timer;
        if (timer <= 0) {
            stopTimer()
            endResults();
            timerElement.innerText = 0;
            finalScore.innerText = 0
        }
    }, 1000);
};

//define stop timer function
function stopTimer() {
    clearInterval(newTimer)
}

// event listener for Start button that starts timer and shows/hides DOM elements
startButton.addEventListener('click', function(){
    startTimer(),
    feedback.classList.remove("hide");
    startScreen.classList.add("hide"),
    questionsDiv.classList.remove("hide")
});