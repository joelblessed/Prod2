import React from 'react'

const Dashboard = ({signout}) => {
  return (
    <div>
      <h1>dashboard</h1>
      <button onClick={signout}>sign out</button>
    </div>
  )
}

export default Dashboard
