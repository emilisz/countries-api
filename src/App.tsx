import { useEffect, useState } from 'react';
import './App.css';
import Country from './components/Country';
import Ordering from './components/Ordering'
import Filters from './components/Filters';
import { dymmyData } from './data.js';
import Pagination from './components/Pagination';


function App() {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState<string>('');
  const [regions, setRegions] = useState<string[]>([]);
  const [selectedArea, setSelectedArea] = useState<string>('999999999');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [defaultOrder, setDefaultOrder] = useState<string>('desc');

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastPage = currentPage * recordsPerPage;
  const indexOfFirstPage = indexOfLastPage - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstPage, indexOfLastPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  const filterData = () => {

    const filteredNumbers = [...data].filter((number) => {
      if (!selectedRegion) {
        setTitle(`* filtered countries with area smaller than ${selectedArea}`)
        return number.area < selectedArea;
      }
        setTitle(`* filtered countries in ${selectedRegion} region, with area smaller than ${selectedArea}`);
        return number.region === selectedRegion && number.area < selectedArea;

    });

    setFilteredData(filteredNumbers);

  }

  const sortByName = (order: String) => {
    if (order) {
      if (order === 'desc') {
        const sortedArray = [...filteredData].sort((a, b) => a.name.localeCompare(b.name))
        setFilteredData(sortedArray);
        setDefaultOrder('desc');
      } else {
        const sortedArray = [...filteredData].sort((a, b) => b.name.localeCompare(a.name))
        setFilteredData(sortedArray);
        setDefaultOrder('asc');
      }
    }
  }

  const reset = () => {
    setSelectedArea('999999999');
    setSelectedRegion('');
    setFilteredData(data);
    setTitle(``);
  }

  const getRegionsNames = async (c: any[]) => {
    setRegions([...new Set(c.map(item => item.region))]);
  }

  const production = false;
  const SOURCE = "https://restcountries.com/v2/all?fields=name,region,area";

  // useEffect(() => {
  //   const fetchApi = async () => {
  //     if (!production) {
  //       console.log('dev environment');

  //       setData(dymmyData);
  //       setFilteredData(data);
  //       getRegionsNames(filteredData);
  //       console.log(filteredData);

  //       setLoading(false);
  //     } else {
  //       fetch(SOURCE)
  //         .then((response) => {
  //           if (!response.ok) {
  //             throw new Error(
  //               `This is an HTTP error: The status is ${response.status}`
  //             );
  //           }
  //           return response.json()
  //         })
  //         .then((actualData) => {
  //           console.log('prod environment');
  //           setData(actualData);
  //           setFilteredData(data)
  //           getRegionsNames(filteredData);
  //           setError(null);
  //         })
  //         .catch((err) => {
  //           setError(err.message);
  //           setData([]);
  //         })
  //         .finally(() => {

  //           setLoading(false);
  //         });
  //     }
  //   }

  //   fetchApi();

  // }, []);



  useEffect(() => {
    if (!production) {
      setData(dymmyData);
      setFilteredData(dymmyData);
      getRegionsNames(dymmyData);
      setLoading(false);
    } else {
      const fetchData = async () => {
        const response = await fetch(SOURCE);
        const json = await response.json();
        setData(json);
        setFilteredData(json)
        getRegionsNames(json);
        setError(null);
      }

      fetchData()
        .catch((err) => {
          setError(err.message);
          setData([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }

  }, [])




  return (
    <div className="App">
      <header>
        <h1>Countries api ({filteredData.length})</h1>
        {data && (
          <div className='filters'>
            <Filters
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              regions={regions}
              filterData={filterData}
              data={data} />
            <button className='button filter' type='button' onClick={() => reset()}>reset</button>
            <Ordering sortByName={sortByName} defaultOrder={defaultOrder} />
          </div>
        )}
        <span className='subtitle'>{title}</span>
      </header>

      {loading && <div>Data loading...</div>}
      {error && (
        <div>{`There is a problem fetching the api data - ${error}`}</div>
      )}


      <div className='countries'>
        {currentRecords &&
          currentRecords.map(({ name, region, area }: { name: string; region: string; area: string }, index) => (
            <Country name={name} region={region} area={area} key={index} />
          ))}
      </div>

      <Pagination recordsPerPage={recordsPerPage} totalRecords={filteredData.length} paginate={paginate}></Pagination>

    </div>
  );
}

export default App;
