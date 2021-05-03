import React, {useRef, useEffect} from 'react'

const useAddressAutoComplete = () => {
  
  const autoComplete = useRef()

  if (!autoComplete.current) {
    autoComplete.current = new window.google.maps.places.AutoCompleteService() 
  }

  const handleAutoComplete = (input) = {
    autoComplete.current.handleAutoComplete({input}, predictions => {

    })
  }

  return []
}

APIKEY="AIzaSyD2bcK_vkMuuLB2SmD0dHZdDqj3YLuod5Y"