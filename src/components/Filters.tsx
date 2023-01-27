interface Filter {
    selectedArea: string;
    setSelectedArea: Function;
    selectedRegion: string;
    setSelectedRegion: Function;
    regions: Array<string>;
    filterData: Function;
    data: Array<any>;
}

const Filters = ({ selectedArea, setSelectedArea, selectedRegion, setSelectedRegion, regions, filterData, data }: Filter) => {

    return (
        <>

            <select className='filter' name="country" id="country" value={selectedArea} onChange={(e) => {
                setSelectedArea(e.target.value);
            }}>
                <option value='999999999' >-- Filter smaller countries than --</option>
                {data &&
                    data.map((d, index) => (
                        <option key={index} value={d.area}>{d.name} ({d.area})</option>
                    ))}
            </select>


            <select className='filter' name="region" id="region" value={selectedRegion} onChange={(e) => {
                setSelectedRegion(e.target.value)
            }}>
                <option value="">-- Filter region --</option>
                {regions &&
                    regions.map((d, index) => (
                        <option key={index} value={d}>{d}</option>
                    ))}
            </select>


            <button className='button filter' type='button' onClick={() => filterData()}>Filter</button>

        </>
    )
}

export default Filters