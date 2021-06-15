import React from 'react'
import {Transition} from 'react-transition-group'

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

const Fade = ({ in: inProp, children }) => (
  <Transition in={inProp} timeout={duration}>
    {state=> (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        {children}
      </div>
    )}
  </Transition>
)

export default Fade