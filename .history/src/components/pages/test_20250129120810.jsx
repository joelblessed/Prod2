import React, { useState, useEffect} from 'react'

const Test = () => {
    const [data, setData] = useState([])
  

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://localhost:5000/products", requestOptions)
            .then(response => response.text())
            .then(result => {(result))
            .catch(error => console.log('error', error));
      }, []);
  
      
     
  return (
    <div>
        <h1>seeen</h1>
      {data}
    </div>
  )
}

export default Test
