import React, { useState, useEffect } from "react";
import Sunny from './sunny.png';
import Rainy from './rainy.png';
import Cloudy from './cloudy.png';

function WeatherMoodWidget(props) {
  const [pic, setPic] = useState(Sunny);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Weather condition changed to:", props.pic);
    
    if (props.pic === "sunny") {
      setPic(Sunny);
    } else if (props.pic === "rainy") {
      setPic(Rainy);
    } else if (props.pic === "cloudy") {
      setPic(Cloudy);
    }
  }, [props.pic]);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="weather-mood-widget">
      <div className="weather-card">
        <h3 className="weather-condition">{props.pic}</h3>
        <button 
          onClick={handleClick} 
          className="weather-button"
          aria-label={`${props.pic} weather mood counter`}
        >
          <img 
            src={pic} 
            alt={`${props.pic} weather icon`} 
            className="weather-image"
          />
          <span className="count">Clicks: {count}</span>
        </button>
      </div>
    </div>
  );
}

export default WeatherMoodWidget;