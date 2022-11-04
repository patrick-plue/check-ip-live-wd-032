import React, { useState, useEffect } from 'react';
import LeafletMap from './components/LeafletMap';
import './styles.css';
import { DateTime } from 'luxon';

function App() {
  const [ip, setIp] = useState();
  const [country, setCountry] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.REACT_APP_IP_URL);
      const data = await response.json();
      setIp(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${ip.location.country}`
      );
      const data = await response.json();
      setCountry(data);
    };
    fetchData();
  }, [ip]);
  return (
    <div className='App'>
      {ip && ip.ip}
      <div className='text-3xl font-bold underline bg-red-500'>
        {' '}
        {DateTime.now().setLocale('de').toLocaleString(DateTime.DATE_FULL)}
      </div>
      {country && <img src={country[0].flags.png} height='100' alt='flag' />}
      <LeafletMap />
    </div>
  );
}

export default App;
