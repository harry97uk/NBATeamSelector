import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { CircularProgress, Breadcrumbs, Typography } from '@mui/material'
import { useGoogleMapsApiKey } from './CustomHooks/googleapihook';
import "../stylesheets/lists.css"

export default function ContinentList() {
    const apiUrl = 'http://localhost:8000/api/continents';

    const [continents, setContinents] = useState([])
    const [loading, setLoading] = useState(true)
    const gak = useGoogleMapsApiKey();
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [mapPosition, setMapPosition] = useState("Europe")

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

    const handleItemClick = (index) => {
        setSelectedItemIndex(index);
        setMapPosition(continents[index].name)
    };

    const handleConfirmButtonClick = (href) => {
        return `/dashboard/continent/${href.split('/').slice(-2)[0]}`
    };

    if (loading) return <CircularProgress />

    return (
        <>
            <div className='list-title'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text.primary">Continents</Typography>
                </Breadcrumbs>
            </div>
            <div id='map-container'>
                <iframe
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen={false}
                    referrerPolicy="no-referrer-when-downgrade"
                    src={"https://www.google.com/maps/embed/v1/place?key=" + gak + "&q=" + mapPosition}>
                </iframe>
            </div>
            <div>
                {continents.map((c, index) => (
                    <ListItemButton key={c.name} onClick={() => handleItemClick(index)} sx={{
                        width: 1 / 3,
                    }}>
                        <ListItemText primary={c.name} />
                        {selectedItemIndex === index ? (
                            <Button
                                variant="contained"
                                component={Link}
                                to={handleConfirmButtonClick(c.href)}
                            >
                                Go
                            </Button>
                        ) : null}
                    </ListItemButton>
                ))}
            </div>
        </>
    )
}


//component={Link} to={"/dashboard/continent/" + c.href.split("/").slice(-2)[0]}