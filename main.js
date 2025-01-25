let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('.reset');
let playAgain = document.querySelector('#play-again');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let turn0 = true;
const audio = document.querySelector('#mySound');
function playButtonSound() {
    buttonSound.play().catch(error => {
        console.error("Error playing button sound:", error);
    });
}

const turnSound = new Audio('turnSound.mp3'); // Create an Audio object for the turn sound

const buttonSound = new Audio('button.mp3');


function playSound() {
    audio.play();
}

const winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const reset = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add('hide');
}


boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        if (turn0) {
            box.innerText = "O";
            turn0 = !turn0;
        }
        else {
            box.innerText = "X";
            turn0 = !turn0;
        }
        turnSound.play();
        box.removeEventListener('click', { once: true });
        box.disabled = true;
        checkWinner();
    })
});

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
}

function showWinner(winner) {
    msg.innerText = ` ${winner} is the Winner!`;
    msgContainer.classList.remove('hide');
    playSound();
    disableBoxes();

}

function checkWinner() {
    for (let pattern of winPatterns) {

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner", pos1Val);
                showWinner(pos1Val);
            }
        }
    }
}


playAgain.addEventListener('click', () => {
    playButtonSound(); // Play sound
    reset(); // Call reset logic
});
resetBtn.addEventListener('click', () => {
    playButtonSound(); // Play sound
    reset(); // Call reset logic
});


