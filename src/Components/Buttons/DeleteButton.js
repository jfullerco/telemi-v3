import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import {db} from '../../Contexts/firebase'

const 

const DeleteButton = ({colRef, docRef}) => {

  const handleClick = async() => {
    
    const res = await db.collection(colRef).doc(docRef).delete()
    console.log(res)
  }

  return(
    <FontAwesomeIcon icon={faTimesCircle} onClick={()=>handleClick(colRef, docRef)} />
  )
}
export default DeleteButton