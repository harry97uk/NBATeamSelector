import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Breadcrumbs, Typography } from '@mui/material';

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
            <div>
                {cities.length > 0 ? cities.map(c => (
                    <ListItemButton key={c.href} component={Link} to={"/dashboard/city/" + c.href.split("/").slice(-2)[0]}>
                        <ListItemText primary={c.name} />
                    </ListItemButton>
                )) : "No Listed Cities"}
            </div>
        </>
    )
}
