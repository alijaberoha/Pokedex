import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import './Quizz.css';

function Quizz() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    axios.get('https://pokebuildapi.fr/api/v1/pokemon')
      .then(res => {
        setPokemonList(res.data);
        const poke = getRandomPokemon(res.data);
        setCurrentPokemon(poke);
        setOptions(generateOptions(poke, res.data));
      })
      .catch(err => console.error(err));
  }, []);

  const getRandomPokemon = (list) => {
    return list[Math.floor(Math.random() * list.length)];
  };

  const generateOptions = (correct, list) => {
    const options = [correct];
    while (options.length < 3) {
      const random = getRandomPokemon(list);
      if (!options.find(p => p.name === random.name)) {
        options.push(random);
      }
    }
    return shuffleArray(options);
  };

  const shuffleArray = (arr) => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  const handleChoice = (choice) => {
    if (choice.name === currentPokemon.name) {
      setReveal(true);
      setTimeout(() => {
        const poke = getRandomPokemon(pokemonList);
        setScore(score + 1);
        setCurrentPokemon(poke);
        setOptions(generateOptions(poke, pokemonList));
        setReveal(false);
      }, 1000); // 1 seconde d'effet reveal
    } else {
      setGameOver(true);
    }
  };

  const handleReplay = () => {
    const poke = getRandomPokemon(pokemonList);
    setScore(0);
    setGameOver(false);
    setCurrentPokemon(poke);
    setOptions(generateOptions(poke, pokemonList));
    setReveal(false);
  };

  if (!currentPokemon) return <p>Chargement...</p>;

  return (
    <div className="contain-qzz">
      <Nav />
      <div className="flex">
        <div className="quiz-container">
          <h2>Quel est ce Pokémon ?</h2>
          <img 
            src={currentPokemon.image} 
            alt="silhouette" 
            className={`poke-img ${reveal ? 'reveal' : ''}`} 
          />

          {!gameOver ? (
            <>
              <div className="choices">
                {options.map(opt => (
                  <button key={opt.id} onClick={() => handleChoice(opt)}>{opt.name}</button>
                ))}
              </div>
              <p>Score : {score}</p>
            </>
          ) : (
            <>
              <p>Raté ! C'était : {currentPokemon.name}</p>
              <p>Score final : {score}</p>
              <button className="replay-btn" onClick={handleReplay}>Rejouer</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quizz;
