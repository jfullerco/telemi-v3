import React from 'react'

const ConfirmationModal = (props) => {
  return(
    <div className="modal is-active">
      <div className="modal-background"></div>
        <div className="modal-card">
          <div className="modal-card-head">
            <div className="modal-card-title">
              {props.header}
            </div>
          </div>
        <div className="modal-card-body">
          {props.children}
        </div>
      </div>
    </div>
  )
}
export default ConfirmationModal