import React from 'react'

const TileField = ({options, children}) => {
  return(
    <div className={ `tile is-rounded ${options}` }>
      {children}
    </div>
  )
}
export default TileField