import React from 'react'

const Home = ({productsBySeller}) => {
  return (
    <div>
      {productsBySeller.map((product,index) =>(
        <a>product.name</a>
      ))}
      
    </div>
  )
}

export default Home
