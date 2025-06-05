import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import Pokedex from '../src/pages/Poke';
import Search from '../src/pages/Search';
import Quizz from '../src/pages/Quizz';
import './App.css';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/search" element={<Search />} />
        <Route path="/quizz" element={<Quizz />} />
      </Routes>
       );
}

export default App;