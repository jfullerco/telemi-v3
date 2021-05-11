import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import {db} from '../../Contexts/firebase'
import ConfirmationModal from '../ConfirmationModal'

const DeleteButton = ({colRef, docRef}) => {

  const [toggleConfirmation, setToggleConfirmation] = useState(false)
  const [confirmed, setConfirmed ] = useState(false)

  const handleClick = async() => {
    
    const res = await db.collection(colRef).doc(docRef).delete()
    setToggleConfirmation(!toggleConfirmation)
  }

  const handleConfirmation = () => {
    
    setToggleConfirmation(!toggleConfirmation)
      
  }

  return(
    <>
      <FontAwesomeIcon icon={faTimesCircle} onClick={()=> {handleConfirmation()}} />
      {toggleConfirmation != false ? 
      <ConfirmationModal header="Confirm Delete">
        <button className="button is-rounded is-danger" onClick={() => {handleClick()}}>Delete</button> <button className="button is-rounded" onClick={()=> {handleConfirmation()}}>Cancel</button>
      </ConfirmationModal>
      : ""}
    </>
  )
}
export default DeleteButton