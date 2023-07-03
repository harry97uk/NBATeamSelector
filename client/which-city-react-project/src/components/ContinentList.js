import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Autocomplete, TextField } from '@mui/material';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import "../stylesheets/lists.css"

export default function ContinentList() {
    const apiUrl = 'http://localhost:8000/api/continents';

    const [continents, setContinents] = useState([])
    const acOptions = useMemo(() => continents.map(c => c.name), [continents]);
    const [loading, setLoading] = useState(true)

    const containerStyle = {
        width: '400px',
        height: '400px'
      };
      
      const center = {
        lat: -3.745,
        lng: -38.523
      };

    useEffect(() => {
        setLoading(true)
        axios.get(apiUrl)
            .then(response => {
                setContinents(response.data._links['continent:items'])
                setLoading(false)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    if (loading) return "Loading..."

    return (
        <>
            <div className='list-title'>
                Continents
            </div>
            <div>
                <LoadScript
                    googleMapsApiKey= 
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                    >
                        { /* Child components, such as markers, info windows, etc. */}
                        <></>
                    </GoogleMap>
                </LoadScript>
            </div>
            <div>
                <Autocomplete
                    disablePortal
                    id="continent-ac"
                    options={acOptions}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Continent" />}
                />
            </div>
            <div>
                {continents.map(c => (
                    <ListItemButton key={c.name} component={Link} to={"/dashboard/continent/" + c.href.split("/").slice(-2)[0]}>
                        <ListItemText primary={c.name} />
                    </ListItemButton>
                ))}
            </div>
        </>
    )
}
