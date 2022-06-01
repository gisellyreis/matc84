import { useState } from 'react';
import axios from 'axios';
import './App.css';
import Profile from './Profile';

function App() {

  const [profiles, setProfiles] = useState([]);
  
  const getUser = async(e) => {
    e.preventDefault();

    const inputName = document.getElementById('name-input');
    const name = inputName.value;
    
    inputName.value = 'Pesquisando ...';

    // Pesquisa na api do github
    await axios.get(`https://api.github.com/users/${name}`)
    .then(response => {
      setProfiles(arr => [...arr, response.data]);
    })
    .catch(error => {
      console.log('Request Failed');
    })

    inputName.value = '';
  }

  return (
    <div className="App">
      <form className='search-form' onSubmit={getUser}> 
        <input type="text"
               name='username'
               placeholder='Digite um usuario do github'
               id='name-input'
               className='name-input'
         />
         <button className='search-btn'>Send</button>
      </form>

      <div className="profiles" > 
        {profiles.length > 0 ? profiles.map((e, i) => <Profile key={i} data={e} />) : ''}
      </div>
    </div>
  );
}

export default App;
