import React from 'react'

const Home = ({filteredProductsBySeller}) => {
  return (
    <div>
      {filteredProductsBySeller.map((product,index) =>(
        <a>product.name</a>
      ))}
      
    </div>
  )
}

export default Home
