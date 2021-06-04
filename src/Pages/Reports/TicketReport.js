import React from 'react'

import PrintComponents from 'react-print-components'

const Report = ({label, children}) => {

  return (
    <>
    <span className="title">
      {label} Report
    </span> 
    <div className="level-right">
      <PrintComponents trigger={<button className="button is-rounded is-small">Print</button>}>
      <div className="title">{label} Report</div>
      {children}
      </PrintComponents>    
    </div>
      </>
  )
}

export default Report