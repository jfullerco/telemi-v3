import React, {useState, useEffect} from 'react'

const Modal = ({title, modalState, children, handleSubmit, autoClose}) => {

  const [toggleModalState, setToggleModalState] = useState(modalState)

  useEffect(()=>{
    setToggleModalState(modalState)
  },[modalState])

  return(
    <div className={toggleModalState === true ? "modal is-active" : "modal"}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <div className="modal-card-head">
        <div className="modal-card-title">
          {title}
          </div>
        </div>
        <div className="modal-card-body">
          {children}
        </div>
        <div className="modal-card-foot">
          <button className="button is-rounded is-link level-item" onClick={handleSubmit}>
            Save
          </button>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={()=> autoClose("")}></button>
        </div>
      </div>
  )
}

export default Modal