import { Weather }  from './Weather'

export const CountryInfo = ({ country }) => {
    const languages = Object.values(country.languages)

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <h3>languages:</h3>
            <ul>
                {languages.map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img src={country.flags.png} alt='' width='150'></img>
            <Weather city={country.capital}/>
        </div>
    );
};