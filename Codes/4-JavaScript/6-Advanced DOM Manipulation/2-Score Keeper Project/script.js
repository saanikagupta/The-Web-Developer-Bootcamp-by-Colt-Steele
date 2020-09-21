// Selecting buttons
const p1Button = document.querySelector("#p1");
const p2Button = document.querySelector("#p2");
const resetButton = document.querySelector("#reset");
const p1Display = document.querySelector("#p1Display");
const p2Display = document.querySelector("#p2Display");
const numInput = document.querySelector("input[type='number']");
const winningScoreDisplay = document.querySelector("p span");

// Defining variables
let p1Score = 0;
let p2Score = 0;
let gameOver = false;
let winningScore = 5;

// Function
function reset(){
    p1Score = 0;
    p2Score = 0;
    p1Display.textContent = p1Score;
    p2Display.textContent = p2Score;
    p1Display.classList.remove("winner");    
    p2Display.classList.remove("winner");
    gameOver = false;
}

// Adding event listeners
p1Button.addEventListener("click", function(){
    if(!gameOver){
        p1Score++;
        p1Display.textContent = p1Score;
        if(p1Score === winningScore){
            p1Display.classList.add("winner");
            gameOver = true;
        }
    }
});

p2Button.addEventListener("click", function(){
    if(!gameOver){
        p2Score++;
        p2Display.textContent = p2Score;
        if(p2Score === winningScore){
            p2Display.classList.add("winner");
            gameOver = true;
        }
    }
});

resetButton.addEventListener("click", reset);

// Every time the number is changed and we hit enter or
numInput.addEventListener("change", function(){
    winningScore = Number(this.value);
    winningScoreDisplay.textContent = winningScore;
    reset();
})