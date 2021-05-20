import React, {useState, useRef, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {stateContext} from '../Contexts/stateContext'
import TextInputAC from '../Components/Forms/TextInputAC'

const Search = (props) => {

  const userContext = useContext(stateContext)
  const history = useHistory()

  const [dropDown, setDropDown] = useState()
  const [locationAC, setLocationAC] = useState()

  const handleLocationSearch = (e) => {
    setDropDown("")
    const {value} = e.target
    const locationAC = props.locations.filter(({Name, Address1, State, City}) => Name.indexOf(value) > -1 || Address1.indexOf(value) > 1 || State.indexOf(value) > -1 || City.indexOf(value) > -1 )
    setDropDown(locationAC)
  }

  const handleLocationRedirect = (name, id) => {
    console.log(name)
    console.log(id)
    userContext.setCurrentLocationID = id
    userContext.setCurrentLocationName = name
    history.push({
      pathname: "/locationdetail",
        state: {
          id: userContext.userSession.currentLocationID
        }
    })
    setDropDown("")
  }
  return(
    <>
    <TextInputAC handleChange={(e)=>handleLocationSearch(e)} 
      label="Search Locations" 
      value="" 
      dropDownState={dropDown}>
        {dropDown != "" ? 
          <ul> 
            {dropDown.map(d => 
              <a className="dropdown-item" key={d.id} onClick={()=> handleLocationRedirect(d.Name, d.id)}>
                <li >{d.Name}</li>
              </a>
            )}
          </ul> 
        : ""} 
    </TextInputAC>
    </>
  )
}
export default Search