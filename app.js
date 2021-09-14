//let's make the mouse a hammer
$('html').css({'cursor': 'url(hammer.cur), default'});

//defining stuff for game logic
const square = document.querySelectorAll('.square')
const mole = document.querySelectorAll('.mole')
const timeLeft = document.querySelector('#time-left')

let score = document.querySelector('#score')

let result = 0
let currentTime = timeLeft.textContent
let randomPosition=square[Math.floor(Math.random() * 9)]

function randomSquare() {
  //no need to traverse all the squares
  randomPosition.classList.remove('mole','porn','illegal','btc','spotify','virus','facebook','youtube','animate__flash','animate__animated','animate__headShake')

  randomPosition = square[Math.floor(Math.random() * 9)]
$(document).ready(function(){
    var classes = ["mole", "porn", "illegal","btc","spotify","virus","facebook","youtube"];

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
      if(square.classList.contains('porn') || square.classList.contains('illegal') || square.classList.contains('mole') || square.classList.contains('btc')  || square.classList.contains('virus')){
      result = result + 1
      score.textContent = result
      hitPosition=null
      square.classList.add('animate__animated', 'animate__flash');
}
      if(square.classList.contains('spotify')  || square.classList.contains('facebook')  || square.classList.contains('youtube')){
      result = result - 1
      score.textContent = result
      hitPosition=null
      square.classList.add('animate__animated', 'animate__headShake');

    }
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
