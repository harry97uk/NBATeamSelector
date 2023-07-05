import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Breadcrumbs, CircularProgress, Typography } from '@mui/material';
import { useGoogleMapsApiKey } from './CustomHooks/customHooks';

export default function CitiesList() {
    const apiUrl = 'http://localhost:8000/api/cities';
    const apiOptions = {
        params: {
            areaID: window.location.href.split("/").slice(-2)[1],
            countryID: window.location.href.split("/").slice(-3)[1]
        }
    }

    const [cities, setCities] = useState([])
    const [area, setArea] = useState([])
    const [country, setCountry] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [mapPosition, setMapPosition] = useState("Europe")
    const gak = useGoogleMapsApiKey()

    useEffect(() => {
        setLoading(true)
        axios.get(apiUrl, apiOptions)
            .then(response => {
                setCities(response.data._links['city:items'])
                setLoading(false)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:8000/api/country', apiOptions)
            .then(response => {
                setCountry(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:8000/api/area', apiOptions)
            .then(response => {
                setArea(response.data)
                setMapPosition(response.data.name)
                setLoading(false)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    const handleItemClick = (index) => {
        setSelectedItemIndex(index);
        setMapPosition(cities[index].name)
    };

    const handleConfirmButtonClick = (href) => {
        return "/dashboard/city/" + href.split("/").slice(-2)[0]
    };

    if (loading) return <CircularProgress />

    return (
        <>
            <div className='list-title'>
                Cities
            </div>
            <div>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" to="/dashboard/continentlist">
                        Continents
                    </Link>
                    <Link underline="hover" color="inherit" to={"/dashboard/continent/" + country._links['country:continent'].href.split("/").slice(-2)[0]}>
                        {country._links['country:continent'].name}
                    </Link>
                    <Link underline="hover" color="inherit" to={"/dashboard/country/" + window.location.href.split("/").slice(-3)[1]}>
                        {country.name}
                    </Link>
                    <Typography color="text.primary">{area.name}</Typography>
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
                {cities.length > 0 ? cities.map((c, index) => (
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
                )) : "No Listed Cities"}
            </div>
        </>
    )
}
