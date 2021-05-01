import React from 'react'
import {db} from '../../Contexts/firebase'

const DeleteButton = ({colRef, docRef}) => {

  const handleClick = async() => {
    
    const res = await db.collection(colRef).doc(docRef).delete()
    console.log(res)
  }

  return(
    <button className="button is-small is-rounded" onClick={()=>handleClick(colRef, docRef)}> Delete</button>
  )
}
export default DeleteButton