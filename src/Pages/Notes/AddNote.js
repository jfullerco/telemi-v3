import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../../Contexts/firebase'
import {stateContext} from '../../../Contexts/stateContext'


const AddNote = (props) => {

  const userContext = useContext(stateContext)
  
  const [pageError, setPageError] = useState("")
  const [pageSuccess, setPageSuccess] = useState(false)
  
  const adminOnly = useRef("")
  const noteAttached = useRef("")
  const noteDate = useRef("")
  const stickyNote = useRef("")

  useEffect(() => {
    
  },[])
  
  
  const handleSubmit = async(e) => {

    const data = {
      Note: noteBody.current.value,
      AttachedTo: props.attachedTo,
      AttachedID: props.attachedID,
      PinToGrid: "false",
      CreatedBy: currentUser,
      Created: noteDate,
      CompanyID: currentCompanyID,
      CompanyName: currentCompany,
  
    }  
    console.log(data)
    const res = await db.collection("Notes").doc().set(data)
    autoClose()
  }

  const handleModalClose = () => {
    setModalState(false)
  }

  const autoClose = () => {
    setTimeout(() => {setModalState(false)}, 1000)
  }
  

  return (
      <>
        <div className="title">
          Add Note
        </div>
        <form>
          <div className="field">
            <div className="control">
              <label className="label">Note Date</label>
              <input className="input is-rounded" type="text" ref={noteDate} />
            </div>
          </div>

          <div className="field">
              <div className="control">
                <label className="label">Note</label>
                <textarea className="textarea is-rounded" type="text" ref={noteBody} />
              </div>
          </div>
          <button className="button level-item" type="submit" onClick={handleSubmit}>
              Attach Note
          </button>        
        </form>
    </>
  )
}
export default AddNote