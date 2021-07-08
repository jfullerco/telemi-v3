import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import SelectField from '../../Components/Forms/SelectField'
import TextBox from '../../Components/Forms/TextBox'
import TextArea from '../../Components/Forms/TextArea'
import QuickAdd from '../../Components/Forms/QuickAdd'
import DeleteButton from '../Buttons/DeleteButton'
import AddLocationModal from '../../Pages/Locations/AddLocationModal'


const ViewDocDrawer = ({
    title, 
    checked, 
    handleClose,   
    dataToShow,
    direction, 
  }) => {
      
      
const {fields, active, type} = dataToShow
console.log(active)
  return(
    <Drawer anchor={direction} open={checked} onClose={handleClose}>
      <div className="drawerPaper">
        <div className="mb-2">
          <div className="title">{title}</div>
        </div>
        <div className="mb-2">
          
          <button className="button is-small is-rounded ml-2" onClick={handleClose}>Close</button>
        </div>

        {active && type === "Location" ? 
          active.map(item => 
            <table>
              <thead>
                <th>
                  Location
                </th>
              </thead>
              <tbody>
              <div key={item.id}>{item && `${item.Address1} ${item.Address2} ${item.City}, ${item.State}`}</div>
              </tbody>
            </table>
          ) 
        : null}
      </div>
      
    </Drawer>
  )
}
export default ViewDocDrawer