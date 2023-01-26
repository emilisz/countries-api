import { useEffect, useState } from 'react';

const Filters = ({selectedArea,setSelectedArea,selectedRegion,setSelectedRegion,  regions, filterData, data, reset }: {
    selectedArea: string;
    setSelectedArea: Function;
    selectedRegion: string;
    setSelectedRegion: Function;
    regions: Array<any>;
    filterData: Function;
    data: Array<any>;
    reset: Function
}) => {




    interface CountryType  {
        readonly name: string
        readonly region: string
        readonly area: string
    };


    return (
        <>
            

            <select className='filter' name="country" id="country" value={selectedArea} onChange={(e) => {
                filterData(e.target.value, selectedRegion)
                setSelectedArea(e.target.value);
                }}>
            <option value="9999999999">-- Filter smaller countries than --</option>
                {data &&
                    data.map((d, index) => (
                        <option key={index} value={d.area}>{d.name} ({d.area})</option>
                    ))}
            </select>


            <select className='filter' name="region" id="region" value={selectedRegion} onChange={(e) => {
                filterData(selectedArea, e.target.value)
                setSelectedRegion(e.target.value)
                }}>
            <option value="">-- Filter region --</option>
                {regions &&
                    regions.map((d, index) => (
                        <option key={index} value={d}>{d}</option>
                    ))}
            </select>



            
        </>
    )
}

export default Filters