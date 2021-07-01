import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import SelectField from '../../Components/Forms/SelectField'
import TextBox from '../../Components/Forms/TextBox'
import TextArea from '../../Components/Forms/TextArea'
import DeleteButton from '../Buttons/DeleteButton'

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
    colRef, 
    docRef, 
    children 
  }) => {
      const headerStyle = {
        borderBottomStyle: "solid",
        borderBottomWidth: "1px",
        bottomBorderColor: "black"
      }
  return(
    <Drawer anchor={direction} open={checked} onClose={handleClose}>
      <div className="drawerPaper">
        <div style={headerStyle} className="mb-2">
          <div className="title">{title}</div>
        </div>
        <div className="mb-2">
          <button className="button is-rounded is-small is-link" type="submit" onClick={handleSubmit}>Save</button>
          <button className="button is-small is-rounded ml-2" onClick={handleClose}>Close</button>
        </div>
        {pageFields.filter(t => t.tab === tab).map(h => {
                switch (h.inputFieldType) {

                  case "related-select":
                    return (
                      
                            <SelectField type="select" title={h.label} name={h.dataField} value={active && active[h.dataField]} handleChange={(e)=>handleRelatedSelectChange(e, {name: h.dataField, relatedName: h.relatedDataField})} >
                              <option></option>
                                {h.inputSource && h.inputSource.map(i => 
                                  <option id={i[h.inputID]} name={i[h.dataField]}>
                                    {i[h.inputValue]}
                                  </option>
                                )}
                            </SelectField>
                        
                    ) 

                  case "select":
                    return (
                      
                            <SelectField type="select" title={h.label} name={h.dataField} value={active && active[h.dataField]} handleChange={(e)=>handleChange(e)} >
                              <option></option>
                                {h.inputSource && h.inputSource.map(i => 
                                  <option name={i[h.dataField]}>
                                    {i[h.inputValue]} 
                                  </option>
                                )}
                            </SelectField>
                        
                    ) 

                  case "text":
                    return (
                      
                          <TextBox title={h.label} name={h.dataField} value={active && active[h.dataField]} fieldChanged={handleChange} />
                        
                    ) 
                  
                    case "currency":
                      return (
                        
                            <TextBox title={h.label} name={h.dataField} value={active && active[h.dataField]} fieldChanged={handleChange} />
                          
                      )

                  case "text-area":
                    return (
                      
                          <TextArea title={h.label} name={h.dataField} value={active && active[h.dataField]} fieldChanged={handleChange} />
                        
                    ) 
                  
                    case "datepicker":
                      return (
                        
                            <TextBox 
                              id="datetime-local"
                              title={h.label}
                              type="date" 
                              name={h.dataField} 
                              className="input is-rounded is-small"
                              value={active && active[h.dataField]} 
                              fieldChanged={(e)=>handleChange(e)} 
                            />
                          
                      )

                      case "mapTEST":
                        return (
                          
                              <>
                              {active[h.dataField].map(item => 
                                <TextArea value={active} />
                              )}
                              <TextBox 
                                id="datetime-local"
                                title={h.label}
                                type="date" 
                                name={h.dataField} 
                                className="input is-rounded is-small"
                                value={active && active[h.dataField]} 
                                fieldChanged={(e)=>handleChange(e)} 
                              />
                              </>
                            
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