
const Ordering = ({ sortByName, defaultOrder }: { sortByName: Function, defaultOrder: string }) => {
    return (
        <select className='filter last-item' name="ordering" id="ordering" value={defaultOrder} onChange={(e) => sortByName(e.target.value)}>
            <option value="desc">Order from A-Z</option>
            <option value="asc">Order from Z-A</option>
        </select>
    )
}

export default Ordering