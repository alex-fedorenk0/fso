export const Country = ({ country, handleFilterChange }) => {
    return (
        <div>
            {country.name.common}
            <button 
                value={ country.name.common }
                onClick={ handleFilterChange }>Show</button>
        </div>
    );
};