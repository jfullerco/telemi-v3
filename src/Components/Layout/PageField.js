import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import MapListTable from '../Tables/MapListTable'

import RelatedFieldDropDown from '../../Components/DropDowns/RelatedFieldDropDown'

const PageField = ({
    field, 
    fieldData, 
    relatedDataMap, 
    toggleViewDrawer, 
    isViewRelatedActive, 
    toggleFieldDropDown, 
    handleClick }) => {
  const history = useHistory()
  const params = useParams()
  
  return(
    <>
    {field && [field].map(item => {
      switch (item.inputFieldType) {

          case "text":
            return (
              
              <>  {[fieldData].map(data => data[item.dataField])} </>
              
            )
          case "text-area":
            return (
              <div className="textareafield">{[fieldData].map(data => data[item.dataField])}</div>
            )
          case "currency":
            return (
              <>
                $ {[fieldData].map(data => data[item.dataField])}
              </>
            )
          case "related-select":
            return (
              <>
                {fieldData && item.relatedDataType === "Location" ?
                item.inputSource != "" ? item.inputSource.filter(f => f.id === fieldData[item.relatedDataField]).map(location =>  
                  
                  <RelatedFieldDropDown label={location.Name} isActive={isViewRelatedActive} handleToggle={()=>toggleFieldDropDown()}>
                  <table>
                    <thead>
                      <th>
                        Address
                      </th>
                    </thead>
                    <tbody>
                      {location != undefined ? <div key={location.id}>{`${location.Address1} ${location.Address2} ${location.City}, ${location.State}`}</div> : "No Address Provided"}
                    </tbody>
                  </table>
                </RelatedFieldDropDown>
                  
                 
                )
                : null : 
                fieldData && item.relatedDataType === "Account" ? <a onClick={
                  (e)=> handleClick({colRef: "Accounts", id: fieldData[item.relatedDataField]})}> {[fieldData].map(data => data[item.dataField])} </a> 
                : 
                fieldData && item.relatedDataType === "Service" ? <a onClick={
                  (e)=> handleClick({colRef: "Services", id: fieldData[item.relatedDataField]})}> {[fieldData].map(data => data[item.dataField])} </a> 
                : null
                }
                
              </>
            )
          case "map-list":
            return (
              <>
              

                <MapListTable 
                  headerFields={item.relatedInputFields}
                  data={relatedDataMap}
                  colRef={item.relatedCollection}
                  handleClick={(e)=>handleClick(e)}
                />
                
              </>
            )
            default:
              return (
                <>
                  {[fieldData].map(data => data[item.dataField])}
                </>
              )
          }
        })
      } 
    </>
  )
}

export default PageField