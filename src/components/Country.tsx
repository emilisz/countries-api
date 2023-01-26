import '../App.css';

const Country = ({ name, region, area, index }: { name: string; region: string; area: string; index: number }) => {
    return (
        <div className='country'>
            <h5>{++index}. {name}</h5>
            <p>Region: {region}</p>
            <p>Area: {area}</p>
        </div>
    )
}

export default Country