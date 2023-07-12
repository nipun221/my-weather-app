import React, { useState } from 'react';

const api = {
  key: "a864917a33813757b2c229aa2b532c88",
  base: "https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=a864917a33813757b2c229aa2b532c88&units=metric"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api.key}&units=metric`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} & ${month} ${date}, ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.weather[0].main === 'Mist') ? 'app mist' : (weather.weather[0].main === 'Haze') ? 'app haze' : (weather.weather[0].main === 'Clouds') ? 'app clouds' : (weather.main.temp < 16) ? 'app cold' : 'app') : 'app'}>
      <main>
        <div className='search-box'>
          <input 
            type='text' 
            className='search-bar' 
            placeholder='Search...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyDown={search}
          />
        </div>
        { (typeof weather.main != "undefined") ? (
        <div>
          <div className='location-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{dateBuilder(new Date())}</div>
          </div>
          <div className='weather-box'>
            <div className='temp'>{Math.round(weather.main.temp)}° Cal</div>
            <div className='weather'>{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('') }
      </main>
    </div>
  );
}

export default App;
