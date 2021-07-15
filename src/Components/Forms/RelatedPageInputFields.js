import React from 'react'
import Columns from '../../Components/Columns'
import Column from '../../Components/Layout/Column'
import SelectField from '../../Components/Forms/SelectField'
import TextBox from '../../Components/Forms/TextBox'
import TextArea from '../../Components/Forms/TextArea'
import DeleteButton from '../Buttons/DeleteButton'
import AddLocationModal from '../../Pages/Locations/AddLocationModal'


const RelatedPageInputFields = ({ 
    relatedPageFields, 
    handleChange, 
    handleRelatedSelectChange,
    handleUpdated,  
  }) => {
      

  return(
    <>
      {relatedPageFields && relatedPageFields.map(field => {
        switch (field.fieldType) {

          case "text":
            return (

              <TextBox title={field.label} name={field.docField} value={""} fieldChanged={(e)=>handleChange(e)} />

            )

          case "currency":
            return (

              <TextBox title={field.label} addOn="currency" name={field.docField} value={""} fieldChanged={(e)=>handleChange(e)} />

            )

          case "text-area":
            return (

              <TextArea title={field.label} name={field.docField} value={""} fieldChanged={(e)=>handleChange(e)} />

            )

          case "datepicker":
            return (
              <TextBox
                id="datetime-local"
                title={field.label}
                type="date"
                name={field.docField}
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