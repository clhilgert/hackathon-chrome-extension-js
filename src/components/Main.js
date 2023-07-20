import React, { useState, useEffect } from 'react';
import Day from './Day';

const Main = () => {
  const [results, setResults] = useState([]); // Use useState to manage results

  const params = {
    zipcode: 63049,
    APIkey: 'qvVj7YVsEgDouhfsGtj5lQcvnwifOVxT',
    locationKey: ''
  };
  
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
        const newResults = data.DailyForecasts.map(el => ({
          Date: formatDateString(el.Date),
          Min: el.Temperature.Minimum.Value,
          Max: el.Temperature.Maximum.Value,
          Rain: el.Day.HasPrecipitation
        }));
        setResults(newResults); // Update the results state with fetched data
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const formatDateString = (dateString) => new Date(dateString).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });

  const dayItems = results.map(obj => (
    <Day key={obj.Date} date={obj.Date} min={obj.Min} max={obj.Max} rain={obj.Rain} />
  ));

  return (
    <div className='main-container'>
      {console.log(results)}
      {console.log(dayItems)}
      {dayItems}
    </div>
  );
};

export default Main;
