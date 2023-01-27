interface Paginate {
  totalRecords: number,
  recordsPerPage: number,
  paginate: any
}

const Pagination = ({ totalRecords, recordsPerPage, paginate }: Paginate) => {

  let pageNumbers: any = [];

  for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pagination'>
      {pageNumbers.map((number: number) => {
        return (
          <a key={number} onClick={() => paginate(number)} href="!#" className="pagination-item">
            {number}
          </a>
        )
      })}
    </div>
  )
}

export default Pagination