console.log("Starting the Game");

//get user choice

let userScore=0;
let computerScore=0;

let choices=document.querySelectorAll(".box");

function getComputerChoice() {
    let arr=["rock","paper","scissor"];
    let index=Math.floor(Math.random()*3);
    return arr[index];
}

function userScoreIncrementor(computerChoice){
    document.getElementById("output-text").innerHTML="YOU Win!! computer draws "+ computerChoice;
    document.getElementById("output-text").style.backgroundColor="lightgreen";
    document.getElementById("player-score").innerHTML=userScore;

}
function computerScoreIncrementor(computerChoice){
    document.getElementById("output-text").innerHTML="computer Wins!! computer draws "+" "+computerChoice;
    document.getElementById("output-text").style.backgroundColor="red";
    document.getElementById("computer-score").innerHTML = computerScore;
}

function getResult(userChoice,computerChoice){
    if(userChoice===computerChoice){
        document.getElementById("output-text").innerHTML="Draw!!";
        document.getElementById("output-text").style.backgroundColor="white";
        return "Draw!";
    }
    else{
        if(userChoice==="rock"){
            if(computerChoice==="paper"){
                computerScore++;
                computerScoreIncrementor(computerChoicecomputerChoice)
                return "Computer Wins";
            }
            else{
                userScore++;
                userScoreIncrementor(computerChoice)
                return "User Wins";
            }
        }
        else if(userChoice==="paper"){
            if(computerChoice==="scissor"){
                computerScore++;
                computerScoreIncrementor(computerChoice)
                return "Computer Wins";
            }
            else{
                userScore++;
                userScoreIncrementor(computerChoice)
                return "User Wins";
            }
        }
        else{
            if(computerChoice==="rock"){
                computerScore++;
                computerScoreIncrementor(computerChoice)
                return "Computer Wins";
            }
            else{
                userScore++;
                userScoreIncrementor(computerChoice)
                return "User Wins";
            }
        }
    }
}


const playGame = function(userChoice){
    console.log("User Choice is: "+userChoice);
    let computerChoice=getComputerChoice();
    console.log("Computer Choice is: "+computerChoice);
    let result=getResult(userChoice,computerChoice);
    console.log(result);
}

choices.forEach(choice => {
    console.log(choice);
    choice.addEventListener("click", function(){
        let userChoice=choice.getAttribute("id");
        playGame(userChoice);
    });
});


