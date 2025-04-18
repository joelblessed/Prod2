import React from 'react';
import './BoxList.css'; // Import your CSS file

const Test = ({ boxes }) => {
  return (
    <div className="box-container">
      {boxes.map((box, index) => (
        <div
          key={index}
          className={box ${index === boxes.length - 1 ? 'last-box' : ''}}
        >
          {box}
        </div>
      ))}
    </div>
  );
};


export default Test;