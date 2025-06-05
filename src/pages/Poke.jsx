import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Nav from '../components/Nav';
import './Poke.css';

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const location = useLocation(); 

  useEffect(() => {
    axios.get('https://pokebuildapi.fr/api/v1/pokemon')
      .then(res => {
        setPokemonList(res.data);

        if (location.state && location.state.selected) {
          setSelectedPokemon(location.state.selected);
        } else {
          setSelectedPokemon(getRandomPokemon(res.data));
        }
      })
      .catch(err => console.error(err));
  }, []);

  const getRandomPokemon = (list) => {
    const index = Math.floor(Math.random() * list.length);
    return list[index];
  };

  const handleNewPokemon = () => {
    setSelectedPokemon(getRandomPokemon(pokemonList));
  };

  if (!selectedPokemon) return <p>Chargement...</p>;

  return (
    <>
      <Nav />
      <div className="contain-Poke">
        <button className="triangle-btn" onClick={handleNewPokemon}>CHANGE</button>

        <div className="poke-card"> <h3>{selectedPokemon.id}</h3>
          <h2>{selectedPokemon.name}</h2>
         
          <img src={selectedPokemon.image} alt={selectedPokemon.name} />
          <div className="infos">
            <p><strong>Types :</strong> {selectedPokemon.apiTypes.map(t => t.name).join(', ')}</p>
            <ul>
              <li>HP : {selectedPokemon.stats.HP}</li>
              <li>Attaque : {selectedPokemon.stats.attack}</li>
              <li>Défense : {selectedPokemon.stats.defense}</li>
              <li>Sp. Attaque : {selectedPokemon.stats.special_attack}</li>
              <li>Sp. Défense : {selectedPokemon.stats.special_defense}</li>
              <li>Vitesse : {selectedPokemon.stats.speed}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pokedex;
