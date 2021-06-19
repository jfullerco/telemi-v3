const initialPageFields = [
    {
      page: "SERVICES",
      fieldGroups: [
        {
          group: "BASIC_INFO",
          fields: [
            { 
              label: "Service Location", 
              dataField: "LocationName", 
              inputFieldType: "related-select", 
              inputSource: locations, 
              inputID: "id", 
              inputValue: "Name", 
              relatedDataField: "LocationID"
            },
            { 
              label: "Vendor", 
              dataField: "Vendor", 
              inputFieldType: "select", 
              inputSource: vendorList, 
              inputID: "id", 
              inputValue: "Name" 
            },
            { 
              label: "Type", 
              dataField: "Type", 
              inputFieldType: "select", 
              inputSource: serviceTypes, 
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
              inputSource: accessTypes, 
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
              inputSource: serviceStatusType, 
              inputID: "id", 
              inputValue: "Name" 
            }

          ]
          
        },
        {
          group: "DATA_DETAILS",
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
            }
          ]
        }
      ]
    }    
  ]

  export {pageFields}