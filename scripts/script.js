const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector(".play-again");
// Initializing game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    // Resetting game variables
    correctLetters = new Array(currentWord.length); // Initialize correctLetters with the length of currentWord
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    
    // Setting up the word display with spaces prefilled
    wordDisplay.innerHTML = currentWord.split("").map((char, index) => {
        if (char === " ") {
            correctLetters[index] = " "; // Automatically adding space to correctLetters
            return `<li class="letter guessed"> </li>`; // Show space in the display
        } else {
            return `<li class="letter"></li>`;
        }
    }).join("");
    
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    // Selecting a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word.toUpperCase(); // Making currentWord as random word
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    // After game complete, showing modal with relevant details
    const modalText = isVictory ? `You found our advice:` : 'The advice was:';
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b> <br><b>Tip: Close the game by clicking the X in the upper right corner.</b>`;

    gameModal.classList.add("show");
        if(isVictory) {
        document.getElementById("refreshButton").style.display = "block"; // or "inline-block" as needed
    } else {
        document.getElementById("refreshButton").style.display = "none";
    }

}

const initGame = (clickedLetter) => {
    let guessedAll = true;

    // Checking if clickedLetter exists in the currentWord
    if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters[index] = letter; // Storing correct letters with their position
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // If clicked letter doesn't exist, then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
        guessedAll = false;
    }

    // Disabling the clicked button
    document.querySelectorAll(`.keyboard button`).forEach(button => {
        if (button.innerText === clickedLetter) {
            button.disabled = true;
        }
    });

    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Checking if all letters have been guessed correctly
    [...currentWord].forEach((letter, index) => {
        if (correctLetters[index] !== letter) {
            guessedAll = false;
        }
    });

    // Calling gameOver function if any of these conditions meet
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(guessedAll) return gameOver(true);
}


// Creating keyboard buttons and adding event listeners
const qwertyRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

qwertyRows.forEach(row => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "keyboard-row";
    row.forEach(letter => {
        const button = document.createElement("button");
        button.innerText = letter;
        rowDiv.appendChild(button);
        button.addEventListener("click", () => initGame(letter));
    });
    keyboardDiv.appendChild(rowDiv);
});

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);

homeBtn.addEventListener("click", function() {
    window.location.replace('http://192.168.43.172:8080');
});

document.addEventListener('DOMContentLoaded', () => {
  // Using event delegation for dynamically added button
  document.body.addEventListener('click', event => {
    if (event.target.id === 'candy') { // Check if the clicked element is your button
      // Refresh the page
fetch('http://192.168.43.172:8080/execute')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text(); // Convert the response to text
  })
  .then(text => {
    alert(text); // Display the text in an alert

    // Execute the reload after a delay of 1000 milliseconds (1 second)
    setTimeout(() => {
    window.location.replace('http://192.168.43.172:8080')
    }, 100);
  })
  .catch(error => {
    console.error('Fetch error:', error);
    alert('Fetch error: ' + error.message); // Optionally alert the error
  });

    }
  });
});
document.addEventListener('keydown', (event) => {
    const letter = event.key.toUpperCase(); // Ensure the letter matches the case of your button texts
    // Check if the key is a letter and prevent input for non-alphabet characters
    if (letter.match(/^[A-Z]$/)) {
        // Get all enabled buttons within the keyboard
        const buttons = Array.from(document.querySelectorAll('.keyboard button:enabled'));
        // Find the button that matches the pressed key
        const button = buttons.find(btn => btn.innerText === letter);
        if (button) {
            button.click(); // Simulate a click on the button
        }
    }
});



