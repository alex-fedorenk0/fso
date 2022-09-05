import { Country } from "./Country";
import { CountryInfo} from './CountryInfo'

export const Countries = ({ countries }) => {
    if (countries.length === 1) {
        return (
            <div>
                <CountryInfo country={countries[0]} />
            </div>
        );        
    }
    else if (countries.length <= 10) {
        return (
            <div>
                {countries.map(country => <Country key={country.ccn3} country={country} />)}
            </div>
        );        
    }
    else {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        );                
    }
};
