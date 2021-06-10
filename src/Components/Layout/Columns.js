import React from 'react'

const Columns = ({options, children}) => {
  return(
    <div className={`columns ${options}`}>{children}</div>
  )
}

export default Columns
