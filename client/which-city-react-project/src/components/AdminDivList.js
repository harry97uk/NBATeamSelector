import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Button } from '@mui/material';
import { Breadcrumbs, CircularProgress, Typography } from '@mui/material';
import { useGoogleMapsApiKey } from './CustomHooks/customHooks';

export default function AdminDivList() {
    const apiUrl = 'http://localhost:8000/api/areas';
    const countryID = window.location.href.split("/").slice(-2)[1]
    const apiOptions = {
        params: {
            countryID: window.location.href.split("/").slice(-2)[1]
        }
    }

    const [areas, setAreas] = useState([])
    const gak = useGoogleMapsApiKey()
    const [continent, setContinent] = useState([])
    const [country, setCountry] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [mapPosition, setMapPosition] = useState("Europe")

    useEffect(() => {
        setLoading(true)
        axios.get(apiUrl, apiOptions)
            .then(response => {
                setAreas(response.data._links['a1:items'])
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
                setContinent(response.data._links['country:continent'])
                setMapPosition(response.data.name)
                setLoading(false)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    const handleItemClick = (index) => {
        setSelectedItemIndex(index);
        setMapPosition(areas[index].name)
    };

    const handleConfirmButtonClick = (href) => {
        return "/dashboard/area/" + countryID + "/" + href.split("/").slice(-2)[0]
    };

    if (loading) return <CircularProgress/>

    return (
        <>
            <div className='list-title'>
                Areas
            </div>
            <div>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" to="/dashboard/continentlist">
                        Continents
                    </Link>
                    <Link underline="hover" color="inherit" to={"/dashboard/continent/" + continent.href.split("/").slice(-2)[0]}>
                        {continent.name}
                    </Link>
                    <Typography color="text.primary">{country.name}</Typography>
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
                {areas.length > 0 ? areas.map((c, index) => (
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
                )) : "No Listed Areas"}
            </div>
        </>
    )
}
