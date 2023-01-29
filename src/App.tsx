import { useEffect, useState, useReducer } from 'react';
import './App.css';
import Country from './components/Country';
import Ordering from './components/Ordering'
import Filters from './components/Filters';
import { dymmyData } from './data.js';
import Pagination from './components/Pagination';
import { reducer } from './reducer';


const production = false;
const SOURCE = "https://restcountries.com/v2/all?fields=name,region,area";

const defaultState = {
  data: [],
  filteredData: [],
  regions: [],
  selectedArea: '999999999',
  selectedRegion: '',
  defaultOrder: 'desc'
}


function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState<string>('');

  const [state, dispatch] = useReducer(reducer, defaultState);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastPage = currentPage * recordsPerPage;
  const indexOfFirstPage = indexOfLastPage - recordsPerPage;
  const currentRecords = state.filteredData.slice(indexOfFirstPage, indexOfLastPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);



  const changeFilter = (type: string, value: string) => {
    if (type === 'area') {
      dispatch({ type: 'CHANGE AREA', payload: value });
    } else {
      dispatch({ type: 'CHANGE REGION', payload: value });
    }

  }

  const filterData = () => {
    const filteredNumbers = [...state.data].filter((number) => {
      if (!state.selectedRegion) {
        setTitle(`* filtered countries with area smaller than ${state.selectedArea}`)
        return number.area < state.selectedArea;
      }
      setTitle(`* filtered countries in ${state.selectedRegion} region, with area smaller than ${state.selectedArea}`);
      return number.region === state.selectedRegion && number.area < state.selectedArea;
    });

    dispatch({ type: 'SET FILTERED DATA', payload: { sortedArray: filteredNumbers, order: 'desc' } });
    paginate(1);
  }

  const sortByName = (order: String) => {
    if (order === 'asc') {
      const sortedArray = [...state.filteredData].sort((a, b) => b.name.localeCompare(a.name))
      dispatch({ type: 'SET FILTERED DATA', payload: { sortedArray: sortedArray, order: 'asc' } });
    } else {
      const sortedArray = [...state.filteredData].sort((a, b) => a.name.localeCompare(b.name))
      dispatch({ type: 'SET FILTERED DATA', payload: { sortedArray: sortedArray, order: 'desc' } });
    }
  }

  const reset = () => {
    dispatch({
      type: 'RESET', payload: {
        selectedArea: '999999999',
        selectedRegion: '',
        filteredData: state.data,
        defaultOrder: 'desc'
      }
    });

    paginate(1);
    setTitle('');
  }

  const getRegionsNames = async (c: any[]) => {
    dispatch({ type: 'SET REGIONS NAMES', payload: [...new Set(c.map(item => item.region))] });
  }


  useEffect(() => {
    if (!production) {
      dispatch({
        type: 'INITIAL DATA SET', payload: {
          cData: dymmyData,
        }
      })
      getRegionsNames(dymmyData);
      setError(null);
      setLoading(false);

    } else {
      const fetchData = async () => {
        const response = await fetch(SOURCE);
        const json = await response.json();
        dispatch({
          type: 'INITIAL DATA SET', payload: {
            cData: json,
          }
        })
        getRegionsNames(json);
        setError(null);
      };

      fetchData()
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }

  }, [])




  return (
    <div className="App">
      <header>
        <h1>Countries api ({state.filteredData.length})</h1>
        {state.data && (
          <div className='filters'>
            <Filters
              changeFilter={changeFilter}
              selectedArea={state.selectedArea}
              selectedRegion={state.selectedRegion}
              regions={state.regions}
              filterData={filterData}
              data={state.data} />
            <button className='button filter' type='button' onClick={() => reset()}>reset</button>
            <Ordering sortByName={sortByName} defaultOrder={state.defaultOrder} />
          </div>
        )}
        <span className='subtitle'>{title}</span>
      </header>

      {loading && <div>Data loading...</div>}
      {error && <div>{`There is a problem fetching the api data - ${error}`}</div>}

      <div className='countries'>
        {currentRecords &&
          currentRecords.length > 0 ?
          currentRecords.map(({ name, region, area }: { name: string; region: string; area: string }, index: number) => (
            <Country name={name} region={region} area={area} key={index} />
          ))
          : <p style={{ textAlign: 'center' }}>No countries found ...</p>
        }
      </div>

      <Pagination recordsPerPage={recordsPerPage} totalRecords={state.filteredData.length} paginate={paginate}></Pagination>

    </div>
  );
}

export default App;
