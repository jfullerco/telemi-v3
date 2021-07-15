import React from 'react'
import Columns from '../../Components/Columns'
import Column from '../../Components/Layout/Column'
import SelectField from '../../Components/Forms/SelectField'
import TextBox from '../../Components/Forms/TextBox'
import TextArea from '../../Components/Forms/TextArea'
import DeleteButton from '../Buttons/DeleteButton'
import AddLocationModal from '../../Pages/Locations/AddLocationModal'


const RelatedPageInputFields = ({ 
    pageFields, 
    handleChange, 
    handleUpdated,  
  }) => {
      console.log(pageFields)

  return(
    <>Page
      {pageFields && pageFields.map(related => {
        switch (related.fieldType) {

          case "text":
            return (<>

              <TextBox title={related.label} name={related.docField} value={""} fieldChanged={(e)=>handleChange(e)} />
</>
            )

          case "currency":
            return (

              <TextBox title={related.label} addOn="currency" name={related.docField} value={""} fieldChanged={(e)=>handleChange(e)} />

            )

          case "text-area":
            return (

              <TextArea title={related.label} name={related.docField} value={""} fieldChanged={(e)=>handleChange(e)} />

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
                fieldChanged={(e) => handleChange(e)}
              />
            )

        }
      }
      )}
    </>  
  )
}
export default RelatedPageInputFields