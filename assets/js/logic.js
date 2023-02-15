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
let correctAudio = new Audio("assets/sfx/correct.wav");
let incorrectAudio = new Audio("assets/sfx/incorrect.wav");
let initials = document.querySelector("#initials");
let submitScore = document.querySelector("#submit");
let feedback = document.querySelector("#feedback");
let timer = 90;
let newTimer;

// define start timer function
function startTimer() {
    newTimer = setInterval(function () {
        timer--;
        timerElement.innerText = timer;
        if (timer <= 0) {
            stopTimer() //stop timer
            endResults(); //end the game
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

const highscores = [];
let i = 0;

// function that stops timer and displays submit section
function endResults() {
    stopTimer()
    questionDiv.classList.add("hide");
    endScreen.classList.remove("hide");
    finalScore.innerText = timerElement.innerText;
    // check if local storage has any values
    if(localStorage.getItem("user") !== null) {
        // get all objects from local storage and write them in highscores array
        JSON.parse(localStorage.getItem("user")).forEach(score => {
            highscores.push(score);
        })
    }
    // event listener for submit score button
    submitScore.addEventListener("click", function() {
        // check if user forgot to inout initials
        if(initials.value === ""){
            feedback.innerText = "Please enter your initials.";
            return;
        }
        let userName = initials.value.toUpperCase();
        let currentScore = finalScore.innerText;
        let scoreObject = {userName, currentScore};
        highscores.push(scoreObject);
        const highestScores = highscores
        // sort highscores and display highest three
        .sort((a, b) => parseInt(b.currentScore) - parseInt(a.currentScore))
        .slice(0, 3)
        localStorage.clear();
        // save array of objects in local storage
        localStorage.setItem("user", JSON.stringify(highestScores));
        // open highscores.html page
        window.open("./highscores.html", "_self");
    })
}

// function to display questions
function getQuestion(i) {
    // check if reached end of questions
    if(i === questions.length) {
        endResults(); // if so, end the game
    } else if (i < questions.length) {
        questionTitle.innerHTML = questions[i].question;
        choicesDiv.innerHTML = "";
        // loop through each answer
        for(const answer of questions[i].answers) {
            const answerLi = document.createElement("li");
            const answerButton = document.createElement("button");
            answerButton.textContent = answer;
            answerButton.addEventListener("click", function() {
                // check if answer is correct then show text and play "correct" sound
                if(questions[i].answers.indexOf(answer) === questions[i].correct) {
                    correctAudio.play(); // play correct audio
                    feedback.innerText = "Correct!";
                // check if answer is incorrect then show text and play "incorrect" sound
                } else {
                    timer -= 10;
                    if(timer < 0) {
                        timer = 0; // reset timer
                    }
                    timerElement.innerText = timer
                    incorrectAudio.play(); // play incorrect audio
                    feedback.innerText = "Incorrect!";
                }
                i++;
                getQuestion(i);
            })
            choicesDiv.appendChild(answerLi);
            answerLi.appendChild(answerButton);
        }
    }
}
getQuestion(i);