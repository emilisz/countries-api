import '../App.css';

interface CountryType {
    name: string;
    region: string;
    area: string
}

const Country = ({ name, region, area }: CountryType) => {
    return (
        <div className='country'>
            <h5>{name}</h5>
            <p>Region: {region}</p>
            <p>Area: {area}</p>
        </div>
    )
}

export default Country