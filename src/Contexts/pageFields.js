const pageFields = [
    {
      page: "SERVICES",
      fieldGroups: [
        {
          group: "BASIC_INFO",
          name: "BASIC INFO",
          fields: [
            { 
              label: "Service Location", 
              dataField: "LocationName", 
              inputFieldType: "related-select", 
              inputSource: "locations", 
              inputID: "id", 
              inputValue: "Name", 
              relatedDataField: "LocationID"
            },
            { 
              label: "Vendor", 
              dataField: "Vendor", 
              inputFieldType: "select", 
              inputSource: "vendorList", 
              inputID: "id", 
              inputValue: "Name" 
            },
            { 
              label: "Type", 
              dataField: "Type", 
              inputFieldType: "select", 
              inputSource: "serviceTypes", 
              inputID: "id", 
              inputValue: "Name"
            },
            { 
              label: "Service Name", 
              dataField: "VendorServiceName",
              inputFieldType: "text" 
            },
            { 
              label: "Access Type", 
              dataField: "AccessType", 
              inputFieldType: "select", 
              inputSource: "accessTypes", 
              inputID: "id", 
              inputValue: "Name" 
            },
            { 
              label: "Asset ID", 
              dataField: "AssetID", 
              inputFieldType: "text" 
            },
            { label: "Bandwidth", 
              dataField: "Bandwidth", 
              inputFieldType: "text" 
            },
            { 
              label: "Monthly Cost", 
              dataField: "MRC", 
              inputFieldType: "text" 
            },
            { 
              label: "Status", 
              dataField: "Status", 
              inputFieldType: "select", 
              inputSource: "serviceStatusType", 
              inputID: "id", 
              inputValue: "Name" 
            }

          ]
          
        },
        {
          group: "DATA_DETAILS",
          name: "DATA DETAILS",
          fields: [
            {
              label: "Bandwidth", 
              dataField: "Bandwidth", 
              inputFieldType: "text",  
              inputValue: "Bandwidth"
            },
            {
              label: "Private IP Range", 
              dataField: "PrivateIPRange", 
              inputFieldType: "text",  
              inputValue: "PrivateIPRange"
            },
            { 
              label: "Managed Router", 
              dataField: "ManagedRouter", 
              inputFieldType: "select",
              inputSource: [{id: "Yes", Name: "Yes"}, {id: "No", Name: "No"}], 
              inputID: "id",
              inputValue: "Name"
            },
            { 
              label: "Notes", 
              dataField: "Notes", 
              inputFieldType: "textarea",
              inputFieldValue: "Notes" 
            }
          ]
        }
      ]
    },
    {
      page: "ORDERS",
      fieldGroups: [
        {
          group: "BASIC_INFO",
          fields: [
            {
              label: "Order Number",
              dataField: "OrderNum",
              inputFieldType: "text",
              inputFieldValue: "OrderNum"
            },
            {
              label: "Order Date",
              dataField: "OrderDate",
              inputFieldType: "text",
              inputFieldValue: "OrderDate"
            },
            {
              label: "Vendor",
              dataField: "Vendor",
              inputFieldType: "select",
              inputFieldValue: "Vendor"
            },
            {
              label: "Service Name",
              dataField: "VendorServiceName",
              inputFieldType: "text",
              inputFieldValue: "VendorServiceName"
            },
            {
              label: "Bandwidth",
              dataField: "Bandwidth",
              inputFieldType: "text",
              inputFieldValue: "Bandwidth"
            },
            {
              label: "Monthly Cost",
              dataField: "MRC",
              inputFieldType: "text",
              inputFieldValue: "MRC"
            },
            {
              label: "Order Location",
              dataField: "Location Name",
              inputFieldType: "related-select",
              inputFieldValue: "LocationName"
            },
            {
              label: "Status",
              dataField: "Status",
              inputFieldType: "select",
              inputFieldValue: "Status"
            },
            {
              label: "Additional Details",
              dataField: "Details",
              inputFieldType: "text-area",
              inputFieldValue: "Details"
            },
          ]
        }
      ]
    }    
  ]

  export { pageFields }