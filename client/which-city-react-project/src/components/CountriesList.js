import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { CircularProgress, Breadcrumbs, Typography } from '@mui/material';
import { useGoogleMapsApiKey } from './CustomHooks/customHooks';

export default function CountriesList() {
    const apiUrl = 'http://localhost:8000/api/countries';
    const apiOptions = {
        params: {
            continentID: window.location.href.split("/").slice(-2)[1]
        }
    }

    const [countries, setCountries] = useState([])
    const [continent, setContinent] = useState([])
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [mapPosition, setMapPosition] = useState("Europe")
    const [loading, setLoading] = useState(true)
    const gak = useGoogleMapsApiKey();

    useEffect(() => {
        setLoading(true)
        axios.get(apiUrl, apiOptions)
            .then(response => {
                setCountries(response.data._links['country:items'])
                setLoading(false)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:8000/api/continent', apiOptions)
            .then(response => {
                setContinent(response.data)
                setMapPosition(response.data.name)
                setLoading(false)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    const handleItemClick = (index) => {
        setSelectedItemIndex(index);
        setMapPosition(countries[index].name)
    };

    const handleConfirmButtonClick = (href) => {
        return `/dashboard/country/${href.split('/').slice(-2)[0]}`
    };

    if (loading) return <CircularProgress />

    return (
        <>
            <div className='list-title'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" to="/dashboard/continentlist">
                        Continents
                    </Link>
                    <Typography color="text.primary">{continent.name}</Typography>
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
                {countries.map((c, index) => (
                    <ListItemButton
                        key={c.name}
                        onClick={() => handleItemClick(index)}
                        sx={{
                            width: 1 / 3,
                        }}>
                        <ListItemText primary={c.name} />
                        <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${c.href.split("/").slice(-2)[0].split(":")[1].toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${c.href.split("/").slice(-2)[0].split(":")[1].toLowerCase()}.png 2x`}
                            alt=""
                            className='country-flag'
                        />
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
