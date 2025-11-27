import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Hook_ControlledButtonState from './Counter.js';
import WeatherMoodWidget from './ WeatherMoodWidget.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Weather data - could also come from an API or configuration
const weatherData = [
  { type: 'sunny', label: 'Sunny Day' },
  { type: 'rainy', label: 'Rainy Day' },
  { type: 'cloudy', label: 'Cloudy Day' }
];

root.render(
  <React.StrictMode>
    <div className="app-container">
      <header className="app-header">
        <h1>Weather Mood App</h1>
      </header>
      
      <main className="main-content">
        <section className="counter-section">
          <h2>Counter Component</h2>
          <Hook_ControlledButtonState />
        </section>
        
        <section className="weather-section">
          <h2>Weather Mood Widgets</h2>
          <div className="weather-widgets-grid">
            {weatherData.map((weather, index) => (
              <WeatherMoodWidget 
                key={index}
                pic={weather.type}
                label={weather.label}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();