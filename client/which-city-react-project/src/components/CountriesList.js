import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { CircularProgress, Breadcrumbs, Typography } from '@mui/material';

export default function CountriesList() {
    const apiUrl = 'http://localhost:8000/api/countries';
    const apiOptions = {
        params: {
            continentID: window.location.href.split("/").slice(-2)[1]
        }
    }

    const [countries, setCountries] = useState([])
    const [continent, setContinent] = useState([])
    const [loading, setLoading] = useState(true)

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
                Countries
            </div>
            <div>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" to="/dashboard/continentlist">
                        Continents
                    </Link>
                    <Typography color="text.primary">{continent.name}</Typography>
                </Breadcrumbs>
            </div>
            <div>
                {countries.map(c => (
                    <ListItemButton key={c.name} component={Link} to={"/dashboard/country/" + c.href.split("/").slice(-2)[0]}>
                        <ListItemText primary={c.name} />
                        <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${c.href.split("/").slice(-2)[0].split(":")[1].toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${c.href.split("/").slice(-2)[0].split(":")[1].toLowerCase()}.png 2x`}
                            alt=""
                        />
                    </ListItemButton>
                ))}
            </div>
        </>
    )
}
