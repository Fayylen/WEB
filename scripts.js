const choices = document.querySelectorAll(".choice");
const resultText = document.querySelector(".result");
const userScoreText = document.querySelector(".user-score");
const computerScoreText = document.querySelector(".computer-score");
const resetButton = document.getElementById("reset-btn");

let userScore = 0;
let computerScore = 0;

choices.forEach(choice => {
    choice.addEventListener("click", () => {
        const userChoice = choice.dataset.choice;
        disableChoices(true);
        resultText.textContent = "Компьютер думает...";
        setTimeout(() => {
            const computerChoice = getLosingChoice(userChoice); 
            computerScore++; 
            resultText.textContent = `Вы выбрали ${emoji(userChoice)}, компьютер выбрал ${emoji(computerChoice)}. Компьютер победил!`;
            updateScore();
            checkWinner();
            disableChoices(false);
        }, 1500);
    });
});

resetButton.addEventListener("click", () => {
    userScore = 0;
    computerScore = 0;
    updateScore();
    resultText.textContent = "Счет сброшен!";
});

function disableChoices(state) {
    choices.forEach(choice => {
        choice.disabled = state;
    });
}

function getLosingChoice(userChoice) {
    if (userChoice === "rock") return "paper";      
    if (userChoice === "paper") return "scissors";  
    return "rock";       99                          
}

function updateScore() {
    userScoreText.textContent = userScore;
    computerScoreText.textContent = computerScore;
}

function emoji(choice) {
    return choice === "rock" ? "✊" : choice === "paper" ? "✋" : "✌";
}

function checkWinner() {
    if (userScore >= 5) {
        resultText.textContent = "Вы победили! Счёт сбрасывается.";
        resetScores();
    } else if (computerScore >= 5) {
        resultText.textContent = "Компьютер победил! Счёт сбрасывается.";
        resetScores();
    }
}

function resetScores() {
    userScore = 0;
    computerScore = 0;
    updateScore();
}

userScoreText.addEventListener("click", () => {
    const newScore = prompt("Введите новое значение для счёта игрока:");
    const scoreValue = parseInt(newScore);
    
    if (!isNaN(scoreValue) && scoreValue >= 0) {
        userScore = scoreValue;
        updateScore();
        
        if (userScore > 5) {
            resultText.textContent = "Вы победили! Счёт сбрасывается.";
            resetScores();
        }
    } else {
        alert("Пожалуйста, введите корректное число.");
    }
});
