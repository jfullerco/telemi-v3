import React from 'react'

const Columns = ({options, children}) => {
  return(
    <div className={`columns ${options} is-gapless`}>{children}</div>
  )
}

export default Columns
