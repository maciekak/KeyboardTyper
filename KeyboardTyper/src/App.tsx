import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { baseUrl, weatherForecastUrl } from './urls'
import Exercise from './Components/Exercise'

function App() {
    const [result, setResult] = useState<any[]>([]);
    const [someText, setSomeText] = useState<string[]>([]);
    console.log(weatherForecastUrl);
    useEffect(() => {
        fetch(weatherForecastUrl)
            .then(res => res.json())
            .then(res => {
                setResult(res);
            })
            .catch(err => { });
        setSomeText(["Dupa 123 123 hehe", "second line hehehe"]);
    }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
              </a>
              <p>
                  {baseUrl}
              </p>
              <p>
                  {weatherForecastUrl}
              </p>
              {result && <ul>
                  {result.map(res => (
                      <li>{res.date}, {res.summary}</li>
                  ))}
              </ul>}

              <Exercise mainText={someText} />
      </header>
    </div>
  );
}

export default App;
