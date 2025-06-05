import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import { useNavigate } from 'react-router-dom';
import '../pages/Search.css';

function Search() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://pokebuildapi.fr/api/v1/pokemon')
      .then(res => setPokemonList(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (pokemon) => {
    navigate('/pokedex', { state: { selected: pokemon } });
  };

  return (
    <>
      <div className='contain-sch'>
        <Nav />
        <h1 className='search-title'>Recherche de Pokémon</h1>

        <input
          type="text"
          placeholder="Cherche un Pokémon..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="grid-pokemon">
          {filteredPokemon.map((pokemon) => (
            <div
              key={pokemon.id}
              className="poke-card"
              onClick={() => handleClick(pokemon)}
            >
              <img src={pokemon.image} alt={pokemon.name} />
              <h3>{pokemon.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Search;
