import { useCallback, useEffect, useState } from "react";
import { HangmanDessin } from "./components/HangmanDessin";
import { HangmanMots } from "./components/HangmanMots";
import { Keyboard } from "./components/HangmanKeyboard";
import "./css/App.css";

function App() {
  const [targetWord, setTargetWord] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectGuesses = guessedLetters.filter(
    (letter) => !targetWord.includes(letter)
  );

  const hasLost = incorrectGuesses.length >= 6;
  const hasWon = targetWord.split("").every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || hasLost || hasWon) return;
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, hasWon, hasLost]
  );

  const resetGame = () => {
    setGuessedLetters([]);
    fetchWord();
  };

  const fetchWord = async () => {
    try {
      const params = new URLSearchParams();
      params.append("locale", "fr-FR");
  
      const response = await fetch("http://localhost:3333", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch word");
      }
      const data = await response.json();
      setTargetWord(data.word);
    } catch (error) {
      console.error("Error fetching word:", error);
    }
  };
  
  

  useEffect(() => {
    fetchWord();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z\-]$/)) return;
      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [guessedLetters, addGuessedLetter]);

  return (
    <div className="content">
      <div className="header">
        <h1 className="titre">Hangman Game</h1>
        <h2 className="alert2">{hasLost && "Dommage.. ! Cliquez sur le bouton pour recommencer"}</h2>
      </div>

      <div className="flex">
        <div>
          <HangmanDessin numberOfGuesses={incorrectGuesses.length} />
        </div>

        <div className="width">
          <Keyboard disabled={hasWon || hasLost} activeLetters={guessedLetters.filter((letter) => targetWord.includes(letter))} inactiveLetters={incorrectGuesses} addGuessedLetter={addGuessedLetter} />
        </div>
      </div>

      <HangmanMots reveal={hasLost} guessedLetters={guessedLetters} wordToGuess={targetWord} />
      <button onClick={resetGame}>Générer un nouveau mot</button>
    </div>
  );
}

export default App;
