import { useEffect, useState } from 'react';
import axios from 'axios';

export function useGoogleMapsApiKey() {
  const [gak, setGak] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/googlemapsapikey')
      .then((response) => {
        setGak(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return gak;
}
