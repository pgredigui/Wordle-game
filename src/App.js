import "./App.css";
import { useState, useEffect } from "react";

import React from "react";

const numberOfWords = 6;
const lenthOfwords = 5;

const correctWord = "tests";

const Line = ({ guess, currentLine }) => {
  const tiles = [];
  for (let i = 0; i < lenthOfwords; i++) {
    const char = guess[i];
    let status = "";
    if (correctWord.includes(char)) {
      status = "included";
      if (char === correctWord[i]) {
        status = "correct";
      }
    }

    console.log("char", char, guess);

    tiles.push(
      <div className={`tile ${currentLine === false ? status : ""}`}>
        {char}
      </div>
    );
  }

  return (
    <div className="line">
      {tiles.map((tile) => {
        return tile;
      })}
    </div>
  );
};

function App() {
  const [listOfGuesses, setlistOfGuesses] = useState(
    new Array(numberOfWords).fill(null)
  );
  const [currentGuess, setcurrentGuess] = useState("");

  const [guessNumber, setguessNumber] = useState(0);

  useEffect(() => {
    const handleType = (event) => {
      if (event.key === "Backspace") {
        setcurrentGuess(currentGuess.slice(0, currentGuess.length - 1));
      }
      if (event.key === "Enter") {
        if (currentGuess.length === 5) {
          const listOfGuessCopy = [...listOfGuesses];
          listOfGuessCopy[guessNumber] = currentGuess;

          setlistOfGuesses(listOfGuessCopy);
          setguessNumber(guessNumber + 1);
          setcurrentGuess("");
        }
      }
      if (event.key.length > 1) {
      } else {
        if (currentGuess.length < 5) {
          setcurrentGuess(currentGuess + event.key);
        }
      }
    };
    window.addEventListener("keydown", handleType);

    return () => {
      window.removeEventListener("keydown", handleType);
    };
  }, [currentGuess, guessNumber, listOfGuesses]);

  return (
    <div className="App">
      <h1>Wordle</h1>

      <div className="wordle_container">
        <div className="wordle_board">
          {listOfGuesses.map((guess, i) => {
            let guessShowed = guess;
            if (guessNumber === i) {
              guessShowed = currentGuess;
            }

            return (
              <Line guess={guessShowed || ""} currentLine={guessNumber === i} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
