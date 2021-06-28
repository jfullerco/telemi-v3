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

    const serviceDetailFields = [
    
      { 
        label: "Service Location", 
        dataField: "LocationName", 
        inputFieldType: "related-select", 
        inputSource: 'locations', 
        inputID: "id", 
        inputValue: "Name", 
        relatedDataField: "LocationID", 
        tab: "BASIC_INFO"  
      },
      { 
        label: "Service Location ID", 
        dataField: "LocationID", 
        visible: false, 
        inputSource: 'locations', 
        inputID: "ID", 
        inputValue: "id", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Vendor", 
        dataField: "Vendor", 
        inputFieldType: "select", 
        inputSource: 'vendorList', 
        inputID: "id", 
        inputValue: "Name", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Type", 
        dataField: "Type", 
        inputFieldType: "select", 
        inputSource: 'serviceTypes', 
        inputID: "id", 
        inputValue: "Name", 
        tab: "BASIC_INFO"
      },
      { 
        label: "Service Name", 
        dataField: "VendorServiceName", 
        inputFieldType: "text", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Access Type", 
        dataField: "AccessType", 
        inputFieldType: "select", 
        inputSource: 'accessTypes', 
        inputID: "id", 
        inputValue: "Name", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Asset ID", 
        dataField: "AssetID", 
        inputFieldType: "text", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Bandwidth", 
        dataField: "Bandwidth", 
        inputFieldType: "text", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Monthly Cost", 
        dataField: "MRC", 
        inputFieldType: "text", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Status", 
        dataField: "Status", 
        inputFieldType: "select", 
        inputSource: 'serviceStatusType', 
        inputID: "id", 
        inputValue: "Name", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Notes", 
        dataField: "Notes", 
        inputFieldType: "text-area", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Related Order", 
        dataField: "OrderNum", 
        inputFieldType: "related-select", 
        inputSource: 'orders', 
        inputID: "id", 
        inputValue: "OrderNum", 
        relatedDataField: "OrderID", 
        tab: "DETAILS"  
      },
      { 
        label: "Related Order ID", 
        dataField: "OrderID", 
        visible: false, 
        inputSource: 'orders', 
        inputID: "ID", 
        inputValue: "id", 
        tab: "DETAILS" 
      },
      { 
        label: "Service Start Date", 
        dataField: "StartDate", 
        visible: true, 
        inputFieldType: "datepicker", 
        tab: "DETAILS" 
      },
      
    ]

export {
    serviceGridColumns, 
    ticketGridColumns, 
    orderGridColumns, 
    accountGridColumns, 
    userGridColumns, 
    contractGridColumns,
    serviceDetailFields
}
