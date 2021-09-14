const square = document.querySelectorAll('.square')
const mole = document.querySelectorAll('.mole')
const porn = document.querySelectorAll('.porn')
const right = document.querySelectorAll('.porn','.illegal')
const illegal = document.querySelectorAll('.illegal')
const timeLeft = document.querySelector('#time-left')

let score = document.querySelector('#score')

let result = 0
let currentTime = timeLeft.textContent
let randomPosition=square[Math.floor(Math.random() * 9)]

function randomSquare() {
  //no need to traverse all the squares
  randomPosition.classList.remove('mole','porn','illegal')

  randomPosition = square[Math.floor(Math.random() * 9)]
$(document).ready(function(){
    var classes = ["mole", "porn", "illegal"];

    $(randomPosition).each(function(){
        $(this).addClass(classes[~~(Math.random()*classes.length)]);
    });
});
  //assign the id of the randomPosition to hitPosition for us to use later
  hitPosition = randomPosition.id
}
square.forEach(square => {
  square.addEventListener('mousedown', () => {
    if(square.id === hitPosition){
      if(square.classList.contains('porn') || square.classList.contains('illegal')){
      result = result + 1
      score.textContent = result
      hitPosition=null}
      if(square.classList.contains('mole')){
      result = result - 1
      score.textContent = result
      hitPosition=null}
      else{result=result}

    }


  })
})


function moveMole() {
  let timerId = null
  timerId = setInterval(randomSquare, 2000)
}

moveMole()


function countDown() {
  currentTime--
  timeLeft.textContent = currentTime

  if(currentTime === 0 ) {
    clearInterval(timerId)
    alert('GAME OVER! Your final score is' + result)
  }
}

let timerId = setInterval(countDown, 1000)
