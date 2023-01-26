
const Ordering = ({ sortByName }: { sortByName: Function }) => {
    return (
        <select className='filter' name="ordering" id="ordering" onChange={(e) => sortByName(e.target.value)}>
            <option value="">-- Order by --</option>
            <option value="desc">Order from A-Z</option>
            <option value="asc">Order from Z-A</option>
        </select>
    )
}

export default Ordering