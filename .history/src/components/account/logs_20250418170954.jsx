import react, { useState } from 'react'

const Logs = () => {

  const [logs, setLogs] = useState([]);

  fetch('http://localhost:5000/logs/u23')
  .then(response => response.json())
  .then(data => console.log('User logs:', data))
  .catch(error => console.error('Error fetching logs:', error));
  return (
    <div> 
      
    </div>
  )
}

export default Logs
