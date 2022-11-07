import { useState } from 'react';
import './App.css';
import Pokemon from './components/Pokemon';

function App() {
  const [index, setIndex] = useState(1)
  const [pokeId, setPokeID] = useState(1)
  const [random, setRandom] = useState(false)
  
  function handleSubmit(e){
    e.preventDefault()
    setRandom(false)
      if(index){
        setPokeID(index)
      }
  }

  function handleRandom(e){
    e.preventDefault()
    setPokeID(pokeId + 1) //incrementing pokeid so useEffect is triggered
    setRandom(true)
  }


  return (
    <>
        <div id='header'>
          <h2>Pokemon</h2>
        </div>
        
        <Pokemon index={pokeId} random={random}/>

        <div id='footer'>
          <form onSubmit={handleSubmit}>
            <label>Type number to get pokemon with index</label>
            <input type="number" min="1" placeholder='Index' onChange={e => setIndex(e.target.value)}/>
            <input id='indexButton' type="submit"  value="OK"/>
          </form>
            <input id='randomButton' onClick={handleRandom} type="button" value="Get random pokemon"/>
        </div>
    </>
  );
}

export default App;
