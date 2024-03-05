import React, { useState } from 'react';
import './index.css'; // Importez votre fichier CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(5);
  const [gameOver, setGameOver] = useState(false); // État pour contrôler l'état du jeu

  // Génère un nouveau nombre aléatoire entre 1 et 100
  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  // Fonction appelée lorsque l'utilisateur soumet son choix
  const handleSubmit = (event) => {
    event.preventDefault();
    const guess = parseInt(userGuess);

    if (isNaN(guess)) {
      setMessage('Veuillez entrer un nombre valide.');
    } else if (guess < randomNumber) {
      setMessage('Le nombre choisi est trop bas.');
      setAttempts(attempts - 1);
    } else if (guess > randomNumber) {
      setMessage('Le nombre choisi est trop élevé.');
      setAttempts(attempts - 1);
    } else {
      setMessage('Félicitations ! Vous avez deviné le nombre.');
      setGameOver(true); // Met à jour l'état du jeu pour indiquer que le jeu est terminé
    }

    if (attempts === 1 && guess !== randomNumber) {
      setMessage(`Vous avez épuisé toutes vos tentatives. Le nombre correct était ${randomNumber}.`);
      setGameOver(true); // Met à jour l'état du jeu pour indiquer que le jeu est terminé
    }
  };

  // Fonction pour redémarrer le jeu
  const restartGame = () => {
    setRandomNumber(generateRandomNumber()); // Génère un nouveau nombre aléatoire
    setUserGuess(''); // Réinitialise le nombre choisi par l'utilisateur
    setMessage(''); // Efface le message
    setAttempts(5); // Réinitialise le nombre de tentatives restantes
    setGameOver(false); // Met à jour l'état du jeu pour indiquer que le jeu recommence
  };

  return (
    <center>
      <div className='body'>
        <h1>Devinez le nombre entre 1 et 100</h1>
        <p>{message}</p>
        {!gameOver && <p>Nombre de tentatives restantes : {attempts}</p>}
        <div className='form-container'>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              required
            />
            <div className='button-container'>
              <button type="submit">Soumettre</button>
            </div>
          </form>
          {gameOver && <button onClick={restartGame}>Recommencer</button>} {/* Affiche le bouton de redémarrage si le jeu est terminé */}
        </div>
      </div>
    </center>
  );
}

export default App;
