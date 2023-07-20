import React from 'react'
import Day from './Day';
import { useEffect } from 'react';


const Main = () => {
  const results = [];
  const params = {
    zipcode: 63049,
    APIkey: 'qvVj7YVsEgDouhfsGtj5lQcvnwifOVxT',
    locationKey: ''
  }
  let location = `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${params.APIkey}&q=${params.zipcode}`;
  let accuWeather = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/`;

  
  useEffect(() => {
    fetch(location)
    .then(response => response.json())
    .then(data => {
      params.locationKey = data[0].Key;
      return params;
    })
    .then(params => {
      return fetch(accuWeather + `${params.locationKey}?apikey=${params.APIkey}`);
    })
    .then(response => response.json())
    .then(data => {
      data.DailyForecasts.forEach((el) => {
        const formatDateString = (dateString) => new Date(dateString).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
        const newObj = {
          'Date': formatDateString(el.Date),
          'Min': el.Temperature.Minimum.Value,
          'Max': el.Temperature.Maximum.Value,
          'Rain': el.Day.HasPrecipitation
        }
        results.push(newObj);
      })
      // console.log(data.DailyForecasts);
      console.log(results)
    })
    .catch(error => {
      console.error('Error:', error);
    })
  }, []);
  
  const dayItems = [];
  results.forEach(obj => {
    dayItems.push(<Day date = {obj.Date} min = {obj.Min} max = {obj.Max} rain = {obj.Rain}/>);
  })
  
  return (
    
    <div className='main-container'>
      {dayItems[0]}
      <Day/>
      <Day/>
      <Day/>
      <Day/>
    </div>
  )
}
export default Main;