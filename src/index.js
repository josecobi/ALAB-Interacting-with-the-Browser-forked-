//Create your game here!
const row0 = document.querySelector("#row0");
const row1 = document.querySelector("#row1");
const feedback = document.querySelector("#feedback");
const columns = 4;
const listOfRows = [row0, row1];

//Give style to each row
for (let i = 0; i < listOfRows.length; i++) {
  listOfRows[i].classList.add("row");
  //Give style to each div within each row
  for (let j = 0; j < columns; j++) {
    listOfRows[i].children[j].classList.add("column");
  }
}

function runGame() {
  window.alert(
    "Welcome to the City Guessing Game!\n\n" +
      "Can you guess the mystery city? You will be given a hint, and your task is to type in the correct city name. " +
      "Each attempt will reveal part of the city in the image and deduct 5 points from your initial score of 45. " +
      "You have 8 attempts to prove your geography skills. Good luck and enjoy the game!",
  );

  let points = 40;
  let userInput;
  let hints = [
    "USA",
    "Cable Cars",
    "The Rock: A Federal Penitentiary",
    "Golden Gate",
    "Fisherman's Warf",
    "Coit Tower",
    "Ferry Building",
    "It starts with 'San' and ends with 'Francisco'",
  ];

  // Create a counter for the hints to let the user know when they run out of hints and attempts.
  let hintsCounter = 0;

  // Create an array to store timeouts
  let timeouts = [];

  //I was having issues with the prompts showing even after the user gave
  //the correct answer clearing all timeouts fixed the issue.
  //https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout
  function clearAllTimeouts() {
    timeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });
  }

  setTimeout(() => {
    // Create variable to break the loop
    let correctAnswerGiven = false;

    // Iterate through the rows
    if (correctAnswerGiven === false) {
      for (let k = 0; k < 2 && !correctAnswerGiven; k++) {
        // Iterate through the columns
        for (let l = 0; l < columns && !correctAnswerGiven; l++) {
          // Use setTimeout to delay the prompts
          let timeout = setTimeout(() => {
            // Ask the user to guess the city and type in the name
            userInput = window.prompt(
              "Enter the name of the city\n" + "Hint:\n" + hints[hintsCounter],
            );

            // Check if the answer is correct. If so, load one piece of the image.
            if (userInput && userInput.toLowerCase() === "san francisco") {
              // Break the loop
              correctAnswerGiven = true;
              //Prevent the prompts from showing up
              clearAllTimeouts();

              for (let i = 0; i < 2; i++) {
                for (let j = 0; j < columns; j++) {
                  listOfRows[i].children[j].style.backgroundColor =
                    `rgba(255, 255, 255, 0)`;
                }
              }

              // Let the user know they guessed the city and display the points
              window.alert(`Congratulations, you scored ${points} points!`);
            }
            // If the answer is wrong, uncover one piece of the picture of the city
            else {
              listOfRows[k].children[l].style.backgroundColor =
                `rgba(255, 255, 255, 0)`;

              // Update hints counter and points
              hintsCounter++;
              points -= 5;

              // Give feedback
              feedback.innerHTML = `<p>Almost! Your current score is: ${points} points.</p>`;
              feedback.classList.remove("feedback-none");
            }

            // If the user runs out of hints, let them know about it and show the final score.
            if (hints.length === hintsCounter) {
              feedback.innerHTML = `<p>Sorry, you ran out of hints. Your final score is: ${points} points.</p>`;
              correctAnswerGiven = true;
            }
          }, l * 3000);

          // Store the timeout ID in the array
          timeouts.push(timeout);
        }
      }
    }
  }, 2000);
}

// Call the runGame function to start the game
runGame();
