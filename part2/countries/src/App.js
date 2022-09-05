import { Filter } from './components/Filter'
import { Countries } from './components/Countries'

import { useState, useEffect } from 'react'
import axios from 'axios'

const App= () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const countriesToShow = countries.filter(
    country => country.name.common.toLowerCase().includes(newFilter.toLowerCase())
    )

  return (
    <div>
        <Filter value={newFilter} onChange={handleFilterChange}/>
        <Countries 
          countries={countriesToShow}
          handleFilterChange={handleFilterChange}/>
    </div>
  );
}

export default App;
