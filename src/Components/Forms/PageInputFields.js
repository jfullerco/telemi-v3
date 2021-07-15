import React from 'react'
import Columns from '../../Components/Columns'
import Column from '../../Components/Layout/Column'
import SelectField from '../../Components/Forms/SelectField'
import TextBox from '../../Components/Forms/TextBox'
import TextArea from '../../Components/Forms/TextArea'
import DeleteButton from '../Buttons/DeleteButton'
import AddLocationModal from '../../Pages/Locations/AddLocationModal'


const PageInputFields = ({ 
    pageFields, 
    active,
    tab, 
    handleChange, 
    handleRelatedSelectChange,
    handleAddRelatedValue,
    addRelatedValue,
    resetAddRelatedValue, 
    handleUpdated,
    currentCompany,
    currentCompanyID, 
    
  }) => {
      

  return(
    <>
    
      {pageFields && pageFields.filter(t => t.tab === tab).map(field => {
        switch (field.inputFieldType) {
          case "related-select":
            return (
              <>
  
                <SelectField
                  type="select"
                  title={field.label}
                  name={field.dataField, <a className="link is-size-7 pl-1" onClick={() => handleAddValue(field)}>(add)</a>}
                  value={active && active[field.dataField]}
                  handleChange={(e) => handleRelatedSelectChange(e, { name: field.dataField, relatedName: field.relatedDataField })}
                  field={field}
                  handleAddValue={(e) => handleAddRelatedValue(e)}
                  showAddLink={true}
                >
                  
                  <option></option>

                  {field.inputSource && field.inputSource.map(i =>
                    <option id={i[field.inputID]} name={i[field.dataField]} key={i[field.inputID]}>
                      {i[field.inputValue]}
                    </option>
                  )}
                </SelectField>

                {addRelatedValue === "Locations" ?
                  <AddLocationModal
                    handleUpdated={handleUpdated}
                    resetAddRelatedValue={() => resetAddRelatedValue()}
                    currentCompany={currentCompany}
                    currentCompanyID={currentCompanyID}
                    nameRef={field.inputValue}
                  /> 
                : ""}

              </>

            )

          case "select":
            return (

              <SelectField type="select" title={field.label} name={field.dataField} value={active && active[field.dataField]} handleChange={(e) => handleChange(e)} >
                <option></option>
                {field.inputSource && field.inputSource.map(i =>
                  <option name={i[field.dataField]} key={i[field.inputID]}>
                    {i[field.inputValue]}
                  </option>
                )}
              </SelectField>

            )

          case "text":
            return (

              <TextBox title={field.label} name={field.dataField} value={active && active[field.dataField]} fieldChanged={handleChange} />

            )

          case "currency":
            return (

              <TextBox title={field.label} addOn="currency" name={field.dataField} value={active && active[field.dataField]} fieldChanged={handleChange} />

            )

          case "text-area":
            return (

              <TextArea title={field.label} name={field.dataField} value={active && active[field.dataField]} fieldChanged={handleChange} />

            )

          case "datepicker":
            return (
              <TextBox
                id="datetime-local"
                title={field.label}
                type="date"
                name={field.dataField}
                className="input is-rounded is-small"
                value={active && active[field.dataField]}
                fieldChanged={(e) => handleChange(e)}
              />
            )

        }
      }
      )}
    </>  
  )
}
export default React.memo(PageInputFields)