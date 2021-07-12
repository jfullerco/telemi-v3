import React from 'react'
import Drawer from '@material-ui/core/Drawer'
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
      {pageFields.filter(t => t.tab === tab).map(field => {
        switch (field.inputFieldType) {
          case "related-select":
            return (
              <>

                {console.log(field.inputSource.filter(f => f[field.checkJoin] === active.id))}
                
                {field.inputSource && field.inputSource.filter(f => f[field.checkJoin] === active.id).length > 0 ? 
                  !active[field.checkJoin] ?
                    field.inputSource.filter(f => f[field.checkJoin] === active.id).map(value =>
                      
                      <a onClick={(e) => handleChange(e)}>
                        <input name={field.dataField} value={value[field.inputValue]} />
                        {console.log(active)}
                      </a> 
                      
                      

                    ) : <>Linked to: <a> {value[field.inputValue]}</a></> : 

                <SelectField
                  type="select"
                  title={field.label}
                  name={field.dataField}
                  value={active && active[field.dataField]}
                  handleChange={(e) => handleRelatedSelectChange(e, { name: field.dataField, relatedName: field.relatedDataField })}
                  addColName={field.relatedCollection}
                  handleAddValue={(e) => handleAddRelatedValue(e)}
                  showAddLink={true}
                >
                  
                  <option></option>

                  {field.inputSource && field.inputSource.map(i =>
                    <option id={i[field.inputID]} name={i[field.dataField]} key={i[field.inputID]}>
                      {i[field.inputValue]}
                    </option>
                  )}
                </SelectField>}

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
export default PageInputFields