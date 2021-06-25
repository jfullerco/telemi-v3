import React from 'react'
  
    const serviceGridColumns = [
      {docField: 'Vendor', headerName: 'Vendor', key: "1", filterable: true},
      {docField: 'VendorServiceName', headerName: 'Product', key: "2", filterable: true},
      {docField: 'LocationName', headerName: 'Location', key: "3", filterable: true},
      {docField: 'AssetID', headerName: 'Asset ID', key: "4", filterable: false},
      {docField: 'Type', headerName: 'Type', key: "5", filterable: true}
    ]

    const ticketGridColumns = [
      {docField: 'Status', headerName: 'Status', key: "1", filterable: true},
      {docField: 'TicketNum', headerName: 'Ticket', key: "2", filterable: false},
      {docField: 'LocationName', headerName: 'Location', key: "3", filterable: true},
      {docField: 'Type', headerName: 'Type', key: "4", filterable: true},
      {docField: 'Details', headerName: 'Details', key: "5", filterable: false}
    ]

    const orderGridColumns = [
      {docField: 'OrderDate', headerName: 'Date', key: "1", filterable: true},
      {docField: 'Vendor', headerName: 'Vendor', key: "2", filterable: true},
      {docField: 'VendorServiceName', headerName: 'Product', key: "3", filterable: true},
      {docField: 'LocationName', headerName: 'Location', key: "4", filterable: true},
      {docField: 'OrderNum', headerName: 'Order Number', key: "5", filterable: false}
    ]

    const accountGridColumns = [
      {docField: 'Vendor', headerName: 'Vendor', key: "1", filterable: true},
      {docField: 'AccountNum', headerName: 'Account', key: "2", filterable: true},
      {docField: 'SubAccountNum', headerName: 'Sub-Account', key: "3", filterable: true},
      {docField: 'AccountServiceLocationName', headerName: 'Location', key: "4", filterable: true},
      {docField: 'PostTaxMRC', headerName: 'Cost', key: "5", filterable: false}
    ]

    const userGridColumns = [
      {docField: 'FirstName', headerName: 'First Name', key: "3"},
      {docField: 'LastName', headerName: 'Last Name', key: "2"},
      {docField: 'Email', headerName: 'Email', key: "1"}
    ]

    const contractGridColumns = [
      {docField: 'Vendor', headerName: 'Vendor', key: "1"},
      {docField: 'Date', headerName: 'Date', key: "2"},
      {docField: 'Term', headerName: 'Term', key: "3"},
      {docField: 'Details', headerName: 'Details', key: "4"}
    ]

export {
    serviceGridColumns, 
    ticketGridColumns, 
    orderGridColumns, 
    accountGridColumns, 
    userGridColumns, 
    contractGridColumns
}
