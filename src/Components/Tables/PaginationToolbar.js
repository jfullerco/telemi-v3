import React, {useState} from 'react'

const PaginationToolbar = ({data, currentPage, handleClick}) => {

  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  
  const offset = (page -1) * pageSize
  const paginatedItems = data.slice(offset).slice(0, pageSize)
  const totalPages = Math.ceil(data.length / pageSize)

  return(
    <nav className="pagination" role="navigation" aria-label="pagination">
      <ul>
        
        <li><a onClick={() => handleClick(pageNum)}>{pageNum}</a></li>
      </ul>
    </nav>
  )
}
export default PaginationToolbar