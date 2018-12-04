/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

//Dice Challenge
var winValue, scores, roundScore, activePlayer, gamePlaying;

//Game init
init()

//init function
function init(){
  scores = [0,0];
  roundScore = 0
  activePlayer = 0
  gamePlaying = true

  let dicesDom = document.querySelectorAll(".dice")
  dicesDom.forEach(dice => {
    dice.style.display = "none"
  });
  document.getElementById("score-0").textContent = 0
  document.getElementById("score-1").textContent = 0
  document.getElementById("current-0").textContent = 0
  document.getElementById("current-1").textContent = 0
}

//roll dice
document.querySelector(".btn-roll").addEventListener("click", function(){
  if (gamePlaying){
    let dicesDom = document.querySelectorAll(".dice")
    dicesDom.forEach(dice => {
      dice.style.display = "block"
    });
  
    winValue = document.querySelector(".final-score").value
  
    //random dice
    let dice1 = Math.floor((Math.random() * 6) + 1);
    let dice2 = Math.floor((Math.random() * 6) + 1);
    let dice = dice1+dice2
    document.getElementById("dice-1").src = `dice-${dice1}.png`
    document.getElementById("dice-2").src = `dice-${dice2}.png`
    
    if(dice !== 2 && dice !== 12){
      //roundScore
      roundScore += dice 
      document.getElementById(`current-${activePlayer}`).textContent = roundScore
    } else{
      nextPlayer()
    }
  }
})

//next player
function nextPlayer(){
  roundScore = 0
  document.getElementById(`current-${activePlayer}`).textContent = roundScore
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
  document.querySelector(`.player-0-panel`).classList.remove('active')
  document.querySelector(`.player-1-panel`).classList.remove('active')
  document.querySelector(`.player-${activePlayer}-panel`).classList.add('active')
}

//hold dice
document.querySelector('.btn-hold').addEventListener("click", function(){
  if (gamePlaying){
    //add player score
    scores[`${activePlayer}`] += roundScore
  
    console.log(scores[`${activePlayer}`])
    //winner
    if (scores[`${activePlayer}`] >= winValue) {
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner')
      gamePlaying = false
    } else{
      document.getElementById(`score-${activePlayer}`).textContent = scores[`${activePlayer}`]
      nextPlayer()
    }
  }
})

//new game
document.querySelector(".btn-new").addEventListener("click", function(){
  init()
  document.querySelector(`.player-0-panel`).classList.remove('winner')
  document.querySelector(`.player-1-panel`).classList.remove('winner')
  document.querySelector(`.player-0-panel`).classList.remove('active')
  document.querySelector(`.player-1-panel`).classList.remove('active')
  document.querySelector(`.player-0-panel`).classList.add('active')
})