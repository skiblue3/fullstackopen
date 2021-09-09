import React, { useEffect, useState } from "react";
import axios from 'axios'

const Country = ( {country} ) => {

  let [weather, setWeather] = useState({})
  const city = country.capital

  const temperature = ('main' in weather) ? (weather.main.temp - 273.15).toFixed(1) : 0
  const icon = ('weather' in weather) ? (`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`) : '#'
  const wind = ('wind' in weather) ? (`${weather.wind.speed} meters/sec with ${weather.wind.deg} degrees`) : '0'

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
      .then(response => {
        console.log("promise fulfilled for weather")
        setWeather(response.data)
      })
  }, [city])

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital} </p>
      <p>Ppopulation: {country.population} </p>
      <h2>languages</h2>
      <ul>
        {
          country.languages.map(language => <li key={language.iso639_1}> {language.name} </li>)
        }
      </ul>
      <img src={country.flag} alt={`country flag of ${country.name}`} width="auto" height="150px"/>

      <h2>{`Weather in ${country.capital}`}</h2>
      <p><b>temperature: </b>{temperature} Celsius</p> 
      <img src={icon} width='auto' height='100px' alt="weather"/>
      <p><b>wind: </b> {wind} </p>
    </div>
  )
}

const Content = ( {displayCountries, handleShow} ) => {
  
  if (displayCountries.length >= 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  if(displayCountries.length === 1) {
    return (
      <Country country={displayCountries[0]} />
    )
  }

  return (
    <div>
        {displayCountries.map(country => {
          return (
            <div key={country.name}>
              {country.name} <button value={country.name} onClick={handleShow} >Show</button>
            </div>
          )
        })}
    </div>
  )
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [findCountry, setFindCountry] = useState('')
  const [displayCountries, setDisplay] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleShow = (event) => {
    const arr = displayCountries.filter(country => country.name === event.target.value)
    setDisplay(arr)
    setFindCountry('')
  }

  const handleFindCountry = (event) => {
    setFindCountry(event.target.value)
    setDisplay(arr)
  }

  const arr = countries.filter(country => {
    return country.name.toLowerCase().includes(findCountry.toLowerCase())
  })

  return (
    <div>
      <div>
        find countries <input value={findCountry} onChange={handleFindCountry} />
      </div>

      <Content displayCountries={displayCountries} handleShow={handleShow} />
    </div>
  )
}

export default App;
