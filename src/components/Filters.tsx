const Filters = ({ selectedArea, setSelectedArea, selectedRegion, setSelectedRegion, regions, filterData, data }: {
    selectedArea: string;
    setSelectedArea: Function;
    selectedRegion: string;
    setSelectedRegion: Function;
    regions: Array<any>;
    filterData: Function;
    data: Array<any>;
}) => {

    return (
        <>

            <select className='filter' name="country" id="country" value={selectedArea} onChange={(e) => {
                setSelectedArea(e.target.value);
            }}>
                <option value='999999999' selected>-- Filter smaller countries than --</option>
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