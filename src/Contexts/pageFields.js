const pageFields = [
  {
    module: "SERVICES",
    
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
            label: "Service Location ID", 
            dataField: "LocationID", 
            inputFieldType: "select", 
            inputSource: locations, 
            inputID: "ID", 
            inputValue: "id" 
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
          },
          { 
            label: "Notes", 
            dataField: "Notes", 
            inputFieldType: "textarea" 
          }

        ]
        
      },
      {
        group: "CONFIG",
        fields: [
          
        ]
      }
      
    ]

  }
      
  ]

  export {pageFields}