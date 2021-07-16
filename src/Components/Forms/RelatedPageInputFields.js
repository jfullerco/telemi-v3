import React from 'react'
import Columns from '../../Components/Columns'
import Column from '../../Components/Layout/Column'
import SelectField from '../../Components/Forms/SelectField'
import TextBox from '../../Components/Forms/TextBox'
import TextArea from '../../Components/Forms/TextArea'
import DeleteButton from '../Buttons/DeleteButton'
import AddLocationModal from '../../Pages/Locations/AddLocationModal'


const RelatedPageInputFields = ({ 
    relatedFields, 
    handleChange, 
    handleUpdated,  
  }) => {
      console.log(relatedFields)

  return(
    <>
    
      {relatedFields && relatedFields.map(related => {
        switch (related.fieldType) {

          case "text":
            return (<>

              <TextBox title={related.label} name={related.docField} fieldChanged={handleChange} />
</>
            )

          case "currency":
            return (

              <TextBox title={related.label} addOn="currency" name={related.docField} fieldChanged={handleChange} />

            )

          case "text-area":
            return (

              <TextArea title={related.label} name={related.docField} fieldChanged={handleChange} />

            )

          case "datepicker":
            return (
              <TextBox
                id="datetime-local"
                title={related.label}
                type="date"
                name={related.docField}
                className="input is-rounded is-small"
                value={""}
                fieldChanged={handleChange}
              />
            )
            
            case "currency":
              return (
  
                <TextBox title={related.label} addOn="currency" name={field.dataField} fieldChanged={handleChange} />
  
              )

        }
      }
      )}
    </>  
  )
}
export default RelatedPageInputFields