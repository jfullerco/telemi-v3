import React from 'react'

import PrintComponents from 'react-print-components'

const Report = ({children}) => {

  return (
      <PrintComponents trigger={<button className="button is-rounded is-small mr-1">Print</button>}>
      {children}
      </PrintComponents>    
    
  )
}

export default Report