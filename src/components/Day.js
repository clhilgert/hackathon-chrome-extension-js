import React from 'react'

const Day = (props) => {
  return (
    <div className='day-container'>
      <p className='date'>{props.date}</p>
      <p className='max'>{props.max}°</p>
      <p className='min'>{props.min}°</p>
      <p className='rain'>{props.rain ? '☀️' : '🌧️'}</p>
    </div>
  );
};

export default Day