import "../css/Mots.css"

type HangmanWordProps = {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
};

export function HangmanMots({ guessedLetters, wordToGuess, reveal = false }: HangmanWordProps) {
  return (
    <div className="word">
      {wordToGuess.split("").map((letter, index) => (
        <span key={index}>
          {guessedLetters.includes(letter) || reveal ? (
            <span style={{ color: guessedLetters.includes(letter) ? "#ffffff" : "#157248" }}>{letter}</span>
          ) : (
            "_"
          )}
        </span>
      ))}
    </div>
  );
}