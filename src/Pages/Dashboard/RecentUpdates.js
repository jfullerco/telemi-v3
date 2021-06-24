import React from 'react'

const RecentUpdates = ({children}) => {
  return(
    <section className="hero">
      <p className="title">Recent Updates</p>
      <p className="hero-body">
        {children}
      </p>
    </section>
  )
}
export default RecentUpdates