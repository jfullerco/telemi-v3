import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { db } from '../../Contexts/firebase'
import ConfirmationModal from '../ConfirmationModal'

const DeleteButton = ({ colRef, docRef }) => {

  const history = useHistory()

  const [toggleConfirmation, setToggleConfirmation] = useState(false)
  const [confirmed, setConfirmed ] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState()
  const [deleteError, setDeleteError] = useState()

  const handleClick = async() => {
    
    try {

    const res = await db.collection(colRef).doc(docRef).delete()
    console.log(res)
    setDeleteSuccess("Successfully Deleted Record")
    autoClose()

    } catch {

      setDeleteError("Error Deleting Record")

    }
    
  }

  const autoClose = () => {

    setTimeout(() => { 
      history.push("/dashboard") 
    }, 1500 )

  }

  const handleConfirmation = () => {
    
    setToggleConfirmation(!toggleConfirmation)
      
  }

  return(
    <>
      <button className="button is-danger is-rounded mx-1" onClick={()=> {handleConfirmation()}}>
        Delete
      </button>
      
      {toggleConfirmation != false ? 
      
      <ConfirmationModal header="Confirm Delete">
        {deleteSuccess && <div className="notification is-success">{deleteSuccess}</div>}
        {deleteError && <div className="notification is-danger">{deleteError}</div>}
        <button className="button is-rounded is-danger" onClick={() => {handleClick()}}>
          Delete
        </button> 
        <button className="button is-rounded" onClick={()=> {handleConfirmation()}}>
          Cancel
        </button>
      </ConfirmationModal>

      : ""}
    </>
  )
}
export default DeleteButton