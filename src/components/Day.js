import React from 'react'

const Day = (props) => {
  return (
    <div className='day-container'>
      <p>{props.date}</p>
      <p>Min: {props.min}</p>
      <p>Max: {props.max}</p>
      <p>Rain: {props.rain ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default Day