import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Autocomplete, TextField } from '@mui/material';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { CircularProgress, Breadcrumbs, Typography } from '@mui/material'
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

    if (loading) return <CircularProgress />

    return (
        <>
            <div className='list-title'>
                Continents
            </div>
            <div>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text.primary">Continents</Typography>
                </Breadcrumbs>
            </div>
            <div>
                <iframe
                    width="600"
                    height="450"
                    style={{border:0}}
                    loading="lazy"
                    allowfullscreen
                    referrerpolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed/v1/place?key=API_KEY
    &q=Space+Needle,Seattle+WA">
                </iframe>
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
