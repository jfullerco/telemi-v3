import React, {useState, useContext} from 'react'

import { db } from '../../Contexts/firebase'

import TextBox from './TextBox'

const QuickAdd = ({
    label,
    visible, 
    colRef, 
    nameRef,
    currentCompany, 
    currentCompanyID
  }) => {

  const [data, setData] = useState()
  const [isVisible, setIsVisible] = useState(visible)

  const handleChange = (e) => {
    const {value} = e.target
    console.log(colRef)
    setData({[nameRef]: value})
    console.log(data)
  }

  const handleSubmit = (data) => {
    setData({...data, ['CompanyID']: currentCompanyID, ['CompanyName']: currentCompany})
    const res = db.collection(colRef).doc().set(data)
    console.log(res)
    setIsVisible(!isVisible)
  }

  return(
    <div className={isVisible === "true" ? "" : "is-hidden"}>
    <TextBox 
      title={label}
      name={nameRef}
      fieldChanged={(e)=>handleChange(e)}

    />
    <button onClick={()=> handleSubmit()}>Add</button>
    </div>
  )
}
export default QuickAdd