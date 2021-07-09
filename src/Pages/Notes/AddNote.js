import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../../Contexts/firebase'
import {stateContext} from '../../../Contexts/stateContext'

const AddNote = (props) => {

  const userContext = useContext(stateContext)
  
  const [modalState, setModalState] = useState(true)
  const [addNoteError, setAddNoteError] = useState("")
  const [success, setSuccess] = useState(false)
  const [triggerClose, setTriggerClose] = useState()

  const [toggleQuestions, setToggleQuestions] = useState(1)
  
  const adminOnly = useRef("")
  const noteAttached = useRef("")
  const noteDate = useRef("")
  const stickyNote = useRef("")

  useEffect(() => {
    
  },[])
  
  
  const handleSubmit = async(e) => {

    const data = {

      NoteDate: noteDate.current.value,
      Note: noteAttached.current.value,
      AttachedTo: props.attachedTo,
      AttachedID: props.attachedID,
      Sticky: "false",
      NoteOwner: "jonathan@jfuller.co",
      CompanyID: userContext.userSession.currentCompanyID,
      CompanyName: userContext.userSession.currentCompany,
  
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
  const handleChange = () => {
    attachedTo.current.value === ""
  }

  return (
    <div className={modalState === true ? "modal is-active" : "modal"}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <div className="modal-card-head">
        <div className="modal-card-title">
          Add Service
          </div>
        </div>
        <div className="modal-card-body">

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
                <textarea className="textarea is-rounded" type="text" ref={noteAttached} />
              </div>
            </div>

          </form>

        <div className="block">
          <div className="notification is-danger is-hidden">{addNoteError}</div>
         {success === true ?  <div className="notification is-success">Note Attached</div> : ""}
        </div>
        <div className="modal-card-foot">

          <button className="button level-item" type="submit" onClick={handleSubmit}>
            Attach Note
          </button>
        
        </div>

        <button className="modal-close is-large" aria-label="close" onClick={handleModalClose}></button>
          
        </div>
      </div>
    </div>
  )
}
export default AddNote