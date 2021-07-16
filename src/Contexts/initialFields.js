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
        filterable: true,
        mobile: true
      },
      {
        docField: 'AssetID', 
        headerName: 'Asset ID', 
        key: "4", 
        filterable: false,
        mobile: true
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
        filterable: false,
        visible: true,
        mobile: false
      },
      {
        docField: 'PostTaxMRC',
        headerName: 'Cost',
        key: "5",
        filterable: false,
        visible: true,
        mobile: true,
        type: "currency"
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
        inputSource: "", /** SET BY HANDLEINITIALFIELDMAPPING FN */
        inputID: "id", 
        inputValue: "Name",
        relatedCollection: "Locations", 
        relatedDataField: "LocationID",
        relatedInputLabel: "Location Name",
        relatedInputFields: [
          {
            label: 'Location Name',
            docField: 'Name',
            fieldType: 'text'
          },
          {
            label: "Address 1",
            docField: "Address1",
            fieldType: "text"
          },
          {
            label: "Address 2",
            docField: "Address2",
            fieldType: "text"
          },
          {
            label: "City",
            docField: "City",
            fieldType: "text"
          },
          {
            label: "State",
            docField: "State",
            fieldType: "text"
          },
          {
            label: "Zip",
            docField: "Zip",
            fieldType: "text"
          }
          ],
        relatedDataType: "Location",
        tab: "BASIC_INFO",
        tabLabel: "BASIC INFO"  
      },
      { 
        label: "Vendor", 
        dataField: "Vendor", 
        inputFieldType: "select", 
        inputSource: "", /** SET BY HANDLEINITIALFIELDMAPPING FN */
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
        tabLabel: "BASIC INFO", 
        isHeader: true
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
        label: "Related Orders", 
        dataField: "OrderNum", 
        inputFieldType: "map-list", 
        inputSource: "", 
        inputID: "id", 
        inputValue: "OrderNum",
        relatedCollection: "Orders", 
        relatedDataField: "ServiceID", 
        relatedInputLabel: "Order Number",
        relatedInputFields: [
                              {
                                label: 'Date', 
                                docField: 'OrderDate', 
                                fieldType: 'datepicker'
                              }, 
                              {
                                label: 'Order Number', 
                                docField: 'OrderNum', 
                                fieldType: 'text'
                              }, 
                              {
                                label: 'Status', 
                                docField: 'Status', 
                                fieldType: 'text'
                              }
        ], 
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
        relatedInputLabel: "Account Number",
        relatedInputFields: [
          {
            label: 'Account Number',
            docField: 'AccountNum',
            fieldType: 'text'
          }
        ], 
        relatedDataType: 'Account',
        tab: 'BILLING',
        tabLabel: 'BILLING'
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
        relatedInputLabel: "Bill",
        relatedInputFields: [
                              {
                                label: 'Date', 
                                docField: 'Date', 
                                fieldType: 'datepicker'
                              }, 
                              {
                                label: 'Cost', 
                                docField: 'Cost', 
                                fieldType: 'currency'
                              }, 
                              {
                                label: 'Disputed', 
                                docField: 'DisputedAmount', 
                                fieldType: 'currency'
                              }
                            ], 
        tab: "BILLING",
        tabLabel: "BILLING", 
      },
      
      
    ]
    const ticketDetailFields = [
    
      { 
        label: "Ticket Number", 
        dataField: "TicketNum", 
        inputFieldType: "text", 
        tab: "BASIC_INFO",
        isHeader: true 
      },

      { 
        label: "Service Location", 
        dataField: "LocationName", 
        inputFieldType: "related-select", 
        inputSource: "", /** SET BY HANDLEINITIALFIELDMAPPING FN */
        inputID: "id", 
        inputValue: "Name",
        relatedCollection: "Locations", 
        relatedDataField: "LocationID",
        relatedInputLabel: "Location Name",
        relatedInputFields: [
          {
            label: 'Location Name',
            docField: 'Name',
            fieldType: 'text'
          },
          {
            label: "Address 1",
            docField: "Address1",
            fieldType: "text"
          },
          {
            label: "Address 2",
            docField: "Address2",
            fieldType: "text"
          },
          {
            label: "City",
            docField: "City",
            fieldType: "text"
          },
          {
            label: "State",
            docField: "State",
            fieldType: "text"
          },
          {
            label: "Zip",
            docField: "Zip",
            fieldType: "text"
          }
          ],
        relatedDataType: "Location",
        tab: "BASIC_INFO",
        tabLabel: "BASIC INFO"  
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
        visible: true, 
        inputFieldType: "related-select", 
        inputSource: "", 
        inputID: "id", 
        inputValue: "AccountNum",
        relatedCollection: "Accounts", 
        relatedDataField: "AccountID",
        relatedInputLabel: "Account Number",
        relatedInputFields: [
          {
            label: 'Account Number',
            docField: 'AccountNum',
            fieldType: 'text'
          }
        ], 
        relatedDataType: 'Account',
        tab: 'BILLING',
        tabLabel: 'BILLING'
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
        relatedCollection: "Services",
        relatedDataField: "ServiceID",
        relatedInputLabel: "Related Asset",
        relatedInputFields: [
          {
            label: 'Asset ID',
            docField: 'AssetID',
            fieldType: 'text'
          }
        ], 
        relatedDataType: 'Service',
        tab: "DETAILS",  
        tabLabel: 'DETAILS'
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

      { 
        label: "Notes", 
        dataField: "NoteID", 
        inputFieldType: "map-list", 
        inputSource: "", 
        inputID: "id", 
        inputValue: "TicketID", 
        relatedCollection: "Notes",
        relatedDataField: "NoteID",
        relatedInputLabel: "Notes",
        relatedInputFields: [
          {
            label: 'Date',
            docField: 'Date',
            fieldType: 'datepicker'
          },
          {
            label: 'Note',
            docField: 'Note',
            fieldType: 'textarea'
          }
        ], 
        relatedDataType: 'Note',
        tab: "NOTES",  
        tabLabel: 'NOTES'
      },
      
    ]
    const accountDetailFields = [
    
      { 
        label: "Account Number", 
        dataField: "AccountNum", 
        inputFieldType: "text",
        isHeader: true, 
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
        label: "Related Services", 
        dataField: "Services", 
        inputFieldType: "map-list", 
        inputSource: "", 
        inputID: "id", 
        inputValue: "AssetID", 
        relatedCollection: "Services",
        relatedDataField: "AccountID",
        relatedInputLabel: "Related Asset",
        relatedInputFields: [
          {
            label: 'Asset ID',
            docField: 'AssetID',
            fieldType: 'text'
          }
        ], 
        relatedDataType: 'Service',
        tab: "DETAILS",  
        tabLabel: 'DETAILS'
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
      { 
        label: "Bills", 
        dataField: "Bills", 
        inputFieldType: "map-list", 
        relatedCollection: "Bills", 
        relatedDataField: "AccountID",
        relatedHeaderFields: [
                              {
                                headerName: 'Date', 
                                docField: 'Date', 
                                fieldType: 'date-picker'
                              }, 
                              {
                                headerName: 'Sub Account', 
                                docField: 'SubAccountNum', 
                                fieldType: 'text'
                              },
                              {
                                headerName: 'Asset ID', 
                                docField: 'AssetID', 
                                fieldType: 'text'
                              },
                              {
                                headerName: 'Cost', 
                                docField: 'Cost', 
                                fieldType: 'currency'
                              }, 
                              
                            ], 
        tab: "BILLING",
        tabLabel: "BILLING",
        addBtn: true 
      },
      { 
        label: "Total Billing Services", 
        dataField: "Bills", 
        inputFieldType: "", 
        relatedCollection: "Bills", 
        relatedDataField: "AccountID",
        relatedHeaderFields: [
                              {
                                headerName: 'Asset ID', 
                                docField: 'AssetID', 
                                fieldType: 'text'
                              },
                              
                            ], 
        relatedDataType: "reduce",
        tab: "BILLING",
        tabLabel: "BILLING",
        addBtn: true 
      },
      { 
        label: "Total Billing Disputed", 
        dataField: "Bills", 
        inputFieldType: "", 
        relatedCollection: "Bills", 
        relatedDataField: "AccountID",
        relatedHeaderFields: [
                              {
                                headerName: 'Disputed Cost', 
                                docField: 'DisputedCost', 
                                fieldType: 'currency'
                              }, 
                              
                            ], 
        relatedDataType: "reduce",
        tab: "BILLING",
        tabLabel: "BILLING",
        addBtn: true 
      },
      
    ]
    const orderDetailFields = [
      { 
        label: "Location", 
        dataField: "LocationName", 
        inputFieldType: "related-select", 
        inputSource: "", /** SET BY HANDLEINITIALFIELDMAPPING FN */
        inputID: "id", 
        inputValue: "Name",
        relatedCollection: "Locations", 
        relatedDataField: "LocationID",
        relatedViewFields: [
            {
              label: "Address 1",
              fieldName: "Address1"
            }, 
            {
              label: "Address 2",
              fieldName: "Address2"
            }, 
            {
              label: "City",
              fieldName: "City"
            }, 
            {
              label: "State",
              fieldName: "State"
            }, 
            {
              label: "Zip",
              fieldName: "Zip"
            }
          ],
        relatedDataType: "Location",
        tab: "BASIC_INFO",
        tabLabel: "BASIC INFO"  
      },
      { 
        label: "Order Number", 
        dataField: "OrderNum", 
        inputFieldType: "text",
        isHeader: true, 
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
        visible: false,
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
        label: "Status", 
        dataField: "Status", 
        inputFieldType: "select", 
        inputSource: "", 
        inputID: "id", 
        inputValue: "Name", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Service", 
        dataField: "AssetID", 
        inputFieldType: "related-select", 
        inputSource: "", /** SET BY HANDLEINITIALFIELDMAPPING FN */
        inputID: "id", 
        inputValue: "AssetID",
        relatedCollection: "Services", 
        relatedDataField: "ServiceID",
        relatedViewFields: [
            {
              label: "Asset ID",
              fieldName: "Address1"
            },
            {
              label: "Product",
              fieldName: "VendorServiceName"
            }
          ],
        relatedDataType: "Service",
        tab: "DETAILS",
        tabLabel: "DETAILS"  
      },
      { 
        label: "Details", 
        dataField: "Details", 
        inputFieldType: "text-area", 
        tab: "DETAILS" 
      },
      {
        label: "Notes",
        dataField: "Notes",
        inputFieldType: "text-area",
        tab: "NOTES"
      }
    ]
    const billsDetailFields = [
      { 
        label: "Location", 
        dataField: "LocationName", 
        inputFieldType: "related-select", 
        inputSource: "", /** SET BY HANDLEINITIALFIELDMAPPING FN */
        inputID: "id", 
        inputValue: "Name",
        relatedCollection: "Locations", 
        relatedDataField: "LocationID",
        relatedViewFields: [
            {
              label: "Address 1",
              fieldName: "Address1"
            }, 
            {
              label: "Address 2",
              fieldName: "Address2"
            }, 
            {
              label: "City",
              fieldName: "City"
            }, 
            {
              label: "State",
              fieldName: "State"
            }, 
            {
              label: "Zip",
              fieldName: "Zip"
            }
          ],
        relatedDataType: "Location",
        tab: "BASIC_INFO",
        tabLabel: "BASIC INFO"  
      },
      { 
        label: "Account Number", 
        dataField: "AccountNum", 
        inputFieldType: "text", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Account ID", 
        dataField: "AccountID", 
        inputFieldType: "text", 
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
        label: "Amount Billed", 
        dataField: "Cost", 
        inputFieldType: "text", 
        tab: "BASIC_INFO" 
      },
      {
        label: "Asset ID",
        dataField: "AssetID",
        inputField: "text",
        tab: "BASIC_INFO"
      },
      { 
        label: "Disputed Amount", 
        dataField: "DisputedAmount", 
        inputFieldType: "text", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Company Name", 
        dataField: "CompanyName", 
        inputFieldType: "text", 
        tab: "BASIC_INFO" 
      },
      { 
        label: "Company ID", 
        dataField: "CompanyID", 
        inputFieldType: "text",  
        tab: "BASIC_INFO" 
      },
  
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
    orderDetailFields,
    billsDetailFields
}
