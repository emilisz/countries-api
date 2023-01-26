import React, { useEffect, useState } from 'react';
import './App.css';
import Country from './components/Country';
import Ordering from './components/Ordering'
import Filters from './components/Filters';
import { dymmyData } from './data.js';


function App() {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState<string>('');
  const [regions, setRegions] = useState<string[]>([]);
  const [selectedArea, setSelectedArea] = useState<string>('9999999999999');
const [selectedRegion, setSelectedRegion] = useState<string>('');

  // const [selectedRegion, setSelectedRegion] = useState<String>("");


  // const showSmallerCountries = (region:string, area:number) => {
  //     const filteredNumbers = [...data].filter((number) => {
  //       return number.area < area && number.region === region;
  //     });
  //     // setSelectedCountrySize(area);
  //     setFilteredData(filteredNumbers);


  // }

  const filterData = (area: number, region: string) => {
    
    const filteredNumbers = [...data].filter((number) => {
      if (!region) {
        setTitle(`* filtered countries with area smaller than ${area}`)
        return number.area < area;
      }
      setTitle(`* filtered countries in ${region} region, with area smaller than ${area}`);
      
      return number.region === region && number.area < area;

    });

    setFilteredData(filteredNumbers);

  }

  const sortByName = (order: String) => {
    if (order) {
      if (order === 'desc') {
        const sortedArray = [...filteredData].sort((a, b) => a.name.localeCompare(b.name))
        setFilteredData(sortedArray);
      } else {
        const sortedArray = [...filteredData].sort((a, b) => b.name.localeCompare(a.name))
        setFilteredData(sortedArray);
      }
    }
  }

  const reset = () => {
    setFilteredData(data);
    setTitle(``);
  }



  useEffect(() => {
    setData(dymmyData);
    setFilteredData(data);
    setRegions([...new Set(data.map(item => item.region))]);
    setLoading(false);

    const SOURCE = "https://restcountries.com/v2/all?fields=name,region,area";

  //   fetch(SOURCE)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(
  //           `This is an HTTP error: The status is ${response.status}`
  //         );
  //       }
  //       return response.json()
  //     })
  //     .then((actualData) => {
  //       setData(actualData);
  //       setFilteredData(data)
  //       setError(null);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setData([]);
  //     })
  //     .finally(() => {
  //       setRegions([...new Set(data.map(item => item.region))]);
  //       setLoading(false);
  //     });

  }, []);


  return (
    <div className="App">

      <header>
        <h1>Countries api ({filteredData.length})</h1>
        {(data && filteredData) && (
          <div className='filters'>
            <Ordering sortByName={sortByName} />
            <Filters
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
              // setSelectedCountrySize={setSelectedCountrySize}
              // showSmallerCountries={showSmallerCountries}
              regions={regions}
              filterData={filterData}
              data={data}
              reset={reset} />
              <button className='button reset filter' type='button' onClick={() => reset()}>reset</button>
          </div>
        )}
        <span className='subtitle'>{title}</span>
      </header>

      {loading && <div>Data loading...</div>}
      {error && (
        <div>{`There is a problem fetching the api data - ${error}`}</div>
      )}


      <div className='countries'>
        {(data && filteredData) &&
          filteredData.map(({ name, region, area }: { name: string; region: string; area: string }, index) => (
            <Country name={name} region={region} area={area} key={index} index={index} />
          ))}
      </div>

    </div>
  );
}

export default App;
