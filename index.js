let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset");
let newGameButton = document.querySelector("#new-game");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX=true; //Player X Or Player O
let count=0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],

];

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        if(turnX){
            box.innerHTML = "X";
            box.style.color="blue";
            turnX = false;
        }
        else{
            box.innerHTML = "O";
            box.style.color="#ff8552";
            turnX = true;
        } 
        box.disabled = true;
        count++;
        
        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});

const resetgame = () => {
    turnX=true;
    count=0;
    enableBoxes();
    msgcontainer.classList.add("hide");
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let posVal1 = boxes[pattern[0]].innerHTML;
        let posVal2 = boxes[pattern[1]].innerHTML;
        let posVal3 = boxes[pattern[2]].innerHTML;

        if(posVal1 != "" && posVal2 != "" && posVal3 != ""){
            if(posVal1 === posVal2 && posVal2 === posVal3){
                showWinner(posVal1);
                return true;
            }
        }
        
    }
};

const gameDraw = () => {
    msg.innerText = "Game was Draw!"
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const showWinner = (winner) => {
    msg.innerText = `${winner} is the Winner!`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled=true;
    }
};
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled=false;
        box.innerText ="";
    }
};

newGameButton.addEventListener("click",resetgame);
resetButton.addEventListener("click",resetgame);
