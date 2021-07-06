import React from 'react'

/** Reference Object Dummy Assignments */

  let locations = []
  let orders = []
  let accounts = []
  let services = []
  let serviceStatusType = []
  let vendorList
  let serviceTypes = []
  let accessTypes = []

/** Grid Fields */
    const serviceGridColumns = [
      {
        docField: 'Vendor', 
        headerName: 'Vendor', 
        key: "1", 
        filterable: true
      },
      {
        docField: 'VendorServiceName', 
        headerName: 'Product', 
        key: "2", 
        filterable: true
      },
      {
        docField: 'LocationName', 
        headerName: 'Location', 
        key: "3", 
        filterable: true
      },
      {
        docField: 'AssetID', 
        headerName: 'Asset ID', 
        key: "4", 
        filterable: false
      },
      {
        docField: 'Type', 
        headerName: 'Type', 
        key: "5", 
        filterable: true
      }
    ]

    const ticketGridColumns = [
      {
        docField: 'Status', 
        headerName: 'Status', 
        key: "1", 
        filterable: true
      },
      {
        docField: 'TicketNum', 
        headerName: 'Ticket', 
        key: "2", 
        filterable: false
      },
      {
        docField: 'LocationName', 
        headerName: 'Location', 
        key: "3", 
        filterable: true
      },
      {
        docField: 'Type', 
        headerName: 'Type', 
        key: "4", 
        filterable: true
      },
      {
        docField: 'Details', 
        headerName: 'Details', 
        key: "5", 
        filterable: false
      }
    ]

    const orderGridColumns = [
      {
        docField: 'OrderDate',
        headerName: 'Date',
        key: "1",
        filterable: true
      },
      {
        docField: 'Vendor',
        headerName: 'Vendor',
        key: "2",
        filterable: true
      },
      { 
        docField: 'VendorServiceName', 
        headerName: 'Product', 
        key: "3", 
        filterable: true 
      },
      { 
        docField: 'LocationName', 
        headerName: 'Location', 
        key: "4", 
        filterable: true 
      },
      { 
        docField: 'OrderNum', 
        headerName: 'Order Number', 
        key: "5", 
        filterable: false 
      }
    ]

    const accountGridColumns = [
      {
        docField: 'Vendor',
        headerName: 'Vendor',
        key: "1",
        filterable: true,
        visible: true,
        mobile: true
      },
      {
        docField: 'AccountNum',
        headerName: 'Account',
        key: "2",
        filterable: true,
        visible: true,
        mobile: false
      },
      {
        docField: 'PostTaxMRC',
        headerName: 'Cost',
        key: "5",
        filterable: false,
        visible: true,
        mobile: true
      }
    ]

    const userGridColumns = [
      {
        docField: 'FirstName', 
        headerName: 'First Name', 
        key: "3"
      },
      {
        docField: 'LastName', 
        headerName: 'Last Name', 
        key: "2"
      },
      {
        docField: 'Email', 
        headerName: 'Email', 
        key: "1"
      }
    ]

    const contractGridColumns = [
      {
        docField: 'Vendor', 
        headerName: 'Vendor', 
        key: "1"
      },
      {
        docField: 'Date', 
        headerName: 'Date', 
        key: "2"
      },
      {
        docField: 'Term', 
        headerName: 'Term', 
        key: "3"
      },
      {
        docField: 'Details', 
        headerName: 'Details', 
        key: "4"
      }
    ]
/** Page Fields */
    const serviceDetailFields = [
    
      { 
        label: "Service Location", 
        dataField: "LocationName", 
        inputFieldType: "related-select", 
        inputSource: "", 
        inputID: "id", 
        inputValue: "Name",
        relatedCollection: "Locations", 
        relatedDataField: "LocationID", 
        tab: "BASIC_INFO",
        tabLabel: "BASIC INFO"  
      },
      { 
        label: "Service Location ID", 
        dataField: "LocationID", 
        visible: false, 
        inputSource: "", 
        inputID: "ID", 
        inputValue: "id", 
        tab: "BASIC_INFO",
        tabLabel: "BASIC INFO" 
      },
      { 
        label: "Vendor", 
        dataField: "Vendor", 
        inputFieldType: "select", 
        inputSource: "", 
        inputID: "id", 
        inputValue: "Name", 
        tab: "BASIC_INFO",
        tabLabel: "BASIC INFO" 
      },
      { 
        label: "Type", 
        dataField: "Type", 
        inputFieldType: "select", 
        inputSource: serviceTypes, 
        inputID: "id", 
        inputValue: "Name", 
        tab: "BASIC_INFO",
        tabLabel: "BASIC INFO"
      },
      { 
        label: "Service Name", 
        dataField: "VendorServiceName", 
        inputFieldType: "text", 
        tab: "BASIC_INFO",
        tabLabel: "BASIC INFO" 
      },
      { 
        label: "Access Type", 
        dataField: "AccessType", 
        inputFieldType: "select", 
        inputSource: accessTypes, 
        inputID: "id", 
        inputValue: "Name", 
        tab: "BASIC_INFO",
        tabLabel: "BASIC INFO" 
      },
      { 
        label: "Asset ID", 
        dataField: "AssetID", 
        inputFieldType: "text", 
        tab: "BASIC_INFO",
        tabLabel: "BASIC INFO" 
      },
      { 
        label: "Bandwidth", 
        dataField: "Bandwidth", 
        inputFieldType: "text", 
        tab: "BASIC_INFO",
        tabLabel: "BASIC INFO" 
      },
      { 
        label: "Monthly Cost", 
        dataField: "MRC", 
        inputFieldType: "currency", 
        tab: "BASIC_INFO",
        tabLabel: "BASIC INFO" 
      },
      { 
        label: "Status", 
        dataField: "Status", 
        inputFieldType: "select", 
        inputSource: serviceStatusType, 
        inputID: "id", 
        inputValue: "Name", 
        tab: "BASIC_INFO",
        tabLabel: "BASIC INFO" 
      },
      { 
        label: "Notes", 
        dataField: "Notes", 
        inputFieldType: "text-area", 
        tab: "NOTES",
        tabLabel: "NOTES" 
      },
      { 
        label: "Related Order", 
        dataField: "OrderNum", 
        inputFieldType: "related-select", 
        inputSource: orders, 
        inputID: "id", 
        inputValue: "OrderNum",
        relatedCollection: "Orders", 
        relatedDataField: "OrderID", 
        tab: "DETAILS",
        tabLabel: "DETAILS"  
      },
      { 
        label: "Related Order ID", 
        dataField: "OrderID", 
        visible: false, 
        inputSource: orders, 
        inputID: "ID", 
        inputValue: "id", 
        tab: "DETAILS",
        tabLabel: "DETAILS" 
      },
      { 
        label: "Service Start Date", 
        dataField: "StartDate", 
        visible: true, 
        inputFieldType: "datepicker", 
        tab: "DETAILS",
        tabLabel: "DETAILS" 
      },
      { 
        label: "Related Account", 
        dataField: "AccountNum",
        visible: true, 
        inputFieldType: "related-select", 
        inputSource: "", 
        inputID: "id", 
        inputValue: "AccountNum",
        relatedCollection: "Accounts", 
        relatedDataField: "AccountID", 
        tab: "BILLING",
        tabLabel: "BILLING"  
      },
      { 
        label: "Sub Account", 
        dataField: "SubAccountNum", 
        inputFieldType: "text", 
        tab: "BILLING",
        tabLabel: "BILLING" 
      },
      { 
        label: "Group Number", 
        dataField: "GroupNum", 
        inputFieldType: "text", 
        tab: "BILLING",
        tabLabel: "BILLING" 
      },
      { 
        label: "Last Bill Amount", 
        dataField: "LastBillAmount", 
        inputFieldType: "currency", 
        tab: "BILLING",
        tabLabel: "BILLING" 
      },
      { 
        label: "Bills", 
        dataField: "Bills", 
        inputFieldType: "map-list", 
        relatedCollection: "Bills", 
        relatedDataField: "ServiceID", 
        tab: "BILLING",
        tabLabel: "BILLING" 
      },
      
      
    ]
    const ticketDetailFields = [
    
      { 
        label: "Ticket Number", 
        dataField: "TicketNum", 
        inputFieldType: "text", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Service Location", 
        dataField: "LocationName", 
        inputFieldType: "related-select", 
        inputSource: locations, 
        inputID: "id", 
        inputValue: "Name", 
        relatedDataField: "LocationID", 
        tab: "BASIC_INFO"  
      },
      { 
        label: "Service Location ID", 
        dataField: "LocationID", 
        visible: false, 
        inputSource: locations, 
        inputID: "ID", 
        inputValue: "id", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Related Account", 
        dataField: "AccountNum", 
        inputFieldType: "related-select", 
        inputSource: accounts, 
        inputID: "id", 
        inputValue: "AccountNum", 
        relatedDataField: "AccountID", 
        tab: "DETAILS"  
      },
      { 
        label: "Related Account ID", 
        dataField: "AccountID", 
        visible: false, 
        inputSource: accounts, 
        inputID: "ID", 
        inputValue: "id", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Related Service", 
        dataField: "ServiceAssetID", 
        inputFieldType: "related-select", 
        inputSource: services, 
        inputID: "id", 
        inputValue: "AssetID", 
        relatedDataField: "ServiceID", 
        tab: "DETAILS"  
      },
      { 
        label: "Vendor", 
        dataField: "Vendor", 
        inputFieldType: "select", 
        inputSource: vendorList, 
        inputID: "id", 
        inputValue: "Name", 
        tab: "BASIC_INFO"
      },
      { 
        label: "Date Submitted", 
        dataField: "DateSubmitted", 
        inputFieldType: "datepicker", 
        tab: "BASIC_INFO"
      },
      { 
        label: "Type", 
        dataField: "Type", 
        inputFieldType: "select", 
        inputSource: [
                        { 
                          id: "Service",
                          Name: "Service" 
                        },
                        { 
                          id: "Billing",
                          Name: "Billing" 
                        },
                        { 
                          id: "Disconnect",
                          Name: "Disconnect" 
                        }
          ], 
        inputID: "id", 
        inputValue: "Name", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Status", 
        dataField: "Status", 
        inputFieldType: "select", 
        inputSource: [
                        { 
                          id: "Active",
                          Name: "Active" 
                        },
                        { 
                          id: "Completed",
                          Name: "Completed" 
                        },
                        { 
                          id: "Cancelled",
                          Name: "Cancelled" 
                        },
                        { 
                          id: "Closed",
                          Name: "Closed" 
                        }
          ], 
        inputID: "id", 
        inputValue: "Name", 
        tab: "BASIC_INFO"  
      },
      { 
        label: "Details", 
        dataField: "Details", 
        inputFieldType: "text-area", 
        tab: "BASIC_INFO" 
      },
      
    ]
    const accountDetailFields = [
    
      { 
        label: "Account Number", 
        dataField: "AccountNum", 
        inputFieldType: "text", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Vendor", 
        dataField: "Vendor", 
        inputFieldType: "select",  
        inputID: "id", 
        inputValue: "Name", 
        tab: "BASIC_INFO"
      },
      { 
        label: "Service Asset", 
        dataField: "AccountServiceName", 
        inputFieldType: "related-select", 
        inputID: "id", 
        inputValue: "AssetID", 
        relatedDataField: "ServiceID", 
        tab: "BASIC_INFO"  
      },
      { 
        label: "Date Billing Started", 
        dataField: "BillingStartDate", 
        inputFieldType: "datepicker", 
        tab: "DETAILS"
      },
      { 
        label: "Type", 
        dataField: "Type", 
        inputFieldType: "text", 
        tab: "DETAILS" 
      },
      { 
        label: "Details", 
        dataField: "Details", 
        inputFieldType: "text-area", 
        tab: "DETAILS" 
      },
      
    ]
    const orderDetailFields = [
      { 
        label: "Order Number", 
        dataField: "OrderNum", 
        inputFieldType: "text", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Date Ordered", 
        dataField: "OrderDate", 
        inputFieldType: "datepicker", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Vendor", 
        dataField: "Vendor", 
        inputFieldType: "select", 
        inputSource: vendorList, 
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
        label: "Order Type",
        dataField: "Type",
        inputField: "select",
        inputSource: "",
        inputID: "id",
        inputValue: "Name",
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
        inputFieldType: "currency", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Order Location", 
        dataField: "LocationName", 
        inputFieldType: "related-select", 
        inputSource: locations, 
        inputID: "id", 
        inputValue: "Name", 
        relatedDataField: "LocationID", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Status", 
        dataField: "Status", 
        inputFieldType: "select", 
        inputSource: "", 
        inputID: "id", 
        inputValue: "Name", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Details", 
        dataField: "Details", 
        inputFieldType: "text-area", 
        tab: "BASIC_INFO" 
      },
      {
        label: "Notes",
        dataField: "Notes",
        inputFieldType: "map",
        tab: "DETAILS"
      }
    ]
  

export {
    serviceGridColumns, 
    ticketGridColumns, 
    orderGridColumns, 
    accountGridColumns, 
    userGridColumns, 
    contractGridColumns,
    serviceDetailFields,
    ticketDetailFields,
    accountDetailFields,
    orderDetailFields
}
