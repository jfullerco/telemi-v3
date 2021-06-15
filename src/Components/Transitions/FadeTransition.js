import React from 'react'
import {Transition} from 'react-transition-group'



const Fade = ({ children }) => {
  const duration = 50000

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
}

const transitionStyles = {
  entering: { opacity: 0.5 },
  entered: { opacity: 1 },
  exiting: { opacity: 0.5 },
  exited: { opacity: 0 }
}
const inProp = true
  return(
  <Transition in={inProp} timeout={duration}>
    {state=> (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        testing
      </div>
    )}
  </Transition>
  )
}

export default Fade