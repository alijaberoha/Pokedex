import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import '../pages/Home.css';
import axios from 'axios';
import ball from '../assets/gif-pokeball1.webp';
import ball2 from '../assets/gif-pokeball3.webp';
import boy from '../assets/gif-boy.jpg';
import boy2 from '../assets/gif-boy2.jpg';
import girl from '../assets/gif-girl.gif';

function Home() {
  const [starters, setStarters] = useState([]);
  const [chosenTrainer, setChosenTrainer] = useState(null);
  const [showTrainerSelection, setShowTrainerSelection] = useState(true);
  const [chosenPokemon, setChosenPokemon] = useState(null);
  const [showStarters, setShowStarters] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showBallAnimation, setShowBallAnimation] = useState(false);
  const [showFinalPokemon, setShowFinalPokemon] = useState(false);

  useEffect(() => {
    const fetchStarters = async () => {
      try {
        const ids = [643, 448, 379];
        const res = await Promise.all(
          ids.map(id => axios.get(`https://pokebuildapi.fr/api/v1/pokemon/${id}`))
        );
        setStarters(res.map(r => r.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchStarters();
  }, []);

  const handleTrainerSelect = (img) => {
    setChosenTrainer(img);
    setTimeout(() => {
      setShowTrainerSelection(false);
      setShowStarters(true);
    }, 800);
  };

  const handlePokemonSelect = (poke) => {
    setShowStarters(false);
    setShowLoading(true);

    setTimeout(() => {
      setShowLoading(false);
      setShowBallAnimation(true);
    }, 6500);

    setTimeout(() => {
      setShowBallAnimation(false);
      setShowFinalPokemon(true);
      setChosenPokemon(poke);
    }, 9000);
  };

  return (
    <div className="contain-Home">
      <Nav />

      {showTrainerSelection && (
        <div className="trainer-selection fond-flou">
          <h2>Choisisser un personnage !</h2>
          <div className="trainer-options">
            <img src={boy} alt="Boy" onClick={() => handleTrainerSelect(boy)} className="trainer-img" />
            <img src={girl} alt="Girl" onClick={() => handleTrainerSelect(girl)} className="trainer-img" />
            <img src={boy2} alt="Boy2" onClick={() => handleTrainerSelect(boy2)} className="trainer-img" />
          </div>
        </div>
      )}

      {showStarters && (
        <div className='ctn'>
          <div className='place fond-flou'>
            <h1>Bienvenue dans le monde Pokémon !</h1>
            <h2>Choisissez un Pokémon du starter pack :</h2>
            <div className="starter-pack">
              {starters.map(poke => (
                <div key={poke.id} className="starter-card" onClick={() => handlePokemonSelect(poke)}>
                  <img src={poke.image} alt={poke.name} />
                  <p>{poke.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showLoading && (
        <div className="loading-screen fond-flou">
          <h2>Chargement...</h2>
        </div>
      )}

      {showBallAnimation && (
        <div className="ball-animation">
          <img src={ball2} alt="Ball" className="ball-small" />
        </div>
      )}

      {showFinalPokemon && (
        <div className="adventure fond-flou">
          <h1>Votre aventure va commencer !</h1>
          <h1>Un nouveau Monde vous attand !</h1>
          <div className="team">
            <img src={chosenPokemon.image} alt={chosenPokemon.name} className="chosen-poke" />
          </div>            <img src={chosenTrainer} alt="Dresseur" className="trainer-img-small" />

        </div>
      )}
    </div>
  );
}

export default Home;
