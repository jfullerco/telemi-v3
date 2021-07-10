import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import SelectField from '../../Components/Forms/SelectField'
import TextBox from '../../Components/Forms/TextBox'
import TextArea from '../../Components/Forms/TextArea'
import QuickAdd from '../../Components/Forms/QuickAdd'
import DeleteButton from '../Buttons/DeleteButton'
import AddLocationModal from '../../Pages/Locations/AddLocationModal'


const EditDocDrawer = ({
    title, 
    checked, 
    handleClose, 
    handleSubmit, 
    pageFields, 
    active,
    tab, 
    direction, 
    handleChange, 
    handleRelatedSelectChange,
    handleAddRelatedValue,
    addRelatedValue,
    resetAddRelatedValue, 
    handleUpdated,
    colRef, 
    docRef,
    currentCompany,
    currentCompanyID, 
    children 
  }) => {
      
      

  return(
    <Drawer anchor={direction} open={checked && checked} onClose={handleClose}>
      <div className="drawerPaper">
        <div className="mb-2">
          <div className="title">EDIT</div>
        </div>
        <div className="mb-2">
          <button className="button is-rounded is-small is-link" type="submit" onClick={handleSubmit}>Save</button>
          <button className="button is-small is-rounded ml-2" onClick={handleClose}>Close</button>
        </div>
        {pageFields.filter(t => t.tab === tab).map(field => {
                switch (field.inputFieldType) {
                  
                  case "related-select":
                    return (
                      
                          <>
                          {console.log([field.inputSource])}
                            <SelectField 
                              type="select" 
                              title={ field.label } 
                              name={ field.dataField } 
                              value={ active && active[field.dataField] } 
                              handleChange={ (e)=>handleRelatedSelectChange(e, { name: field.dataField, relatedName: field.relatedDataField }) }
                              addColName={field.relatedCollection} 
                              handleAddValue={(e)=> handleAddRelatedValue(e)}
                              showAddLink={true}
                            >
                                <option></option>
                                {field.inputSource && field.inputSource.map(i => 
                                  <option id={i[field.inputID]} name={i[field.dataField]}>
                                    {i[field.inputValue]}
                                  </option>
                                )}
                            </SelectField>
                            
                            {addRelatedValue === "Locations" ? 
                              <AddLocationModal 
                                handleUpdated={handleUpdated} 
                                resetAddRelatedValue={()=>resetAddRelatedValue()} 
                                currentCompany={currentCompany} 
                                currentCompanyID={currentCompanyID} 
                                nameRef={field.inputValue} 
                              /> : "" }
                          
                          </>
                        
                    ) 

                  case "select":
                    return (
                      
                            <SelectField type="select" title={field.label} name={field.dataField} value={active && active[field.dataField]} handleChange={(e)=>handleChange(e)} >
                              <option></option>
                                {field.inputSource && field.inputSource.map(i => 
                                  <option name={i[field.dataField]}>
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
                              fieldChanged={(e)=>handleChange(e)} 
                            />
                          
                      )
  
                  }
                }
              )}
      </div>
      <DeleteButton colRef={colRef} docRef={docRef} />
    </Drawer>
  )
}
export default EditDocDrawer