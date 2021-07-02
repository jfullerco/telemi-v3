import React, {useState, useContext} from 'react'

import { db } from '../../Contexts/firebase'

import TextBox from './TextBox'

const QuickAdd = ({
    label,
    visible,
    resetter, 
    colAddRef, 
    nameRef,
    currentCompany, 
    currentCompanyID
  }) => {

  const [data, setData] = useState()

  const handleChange = (e) => {
    const {value} = e.target
    
    setData({[nameRef]: value})
    
  }
console.log(data)
  const handleSubmit = () => {
    setData({...data, ['CompanyID']: currentCompanyID, ['CompanyName']: currentCompany})
    const res = db.collection(colAddRef).doc().set(data)
    
    
  }

  return(
    <div className="control">
    <TextBox 
      title={label}
      name={nameRef}
      fieldChanged={(e)=>handleChange(e)}

    />
    <button className="button is-small is-rounded" onClick={()=> handleSubmit()}>Add</button>
    </div>
  )
}
export default QuickAdd