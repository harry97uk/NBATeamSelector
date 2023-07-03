import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Breadcrumbs, Typography } from '@mui/material';

export default function AdminDivList() {
    const apiUrl = 'http://localhost:8000/api/areas';
    const countryID = window.location.href.split("/").slice(-2)[1]
    const apiOptions = {
        params: {
            countryID: window.location.href.split("/").slice(-2)[1]
        }
    }

    const [areas, setAreas] = useState([])
    const [continent, setContinent] = useState([])
    const [country, setCountry] = useState([])
    const [loading, setLoading] = useState(true)

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
            <div>
                {areas.length > 0 ? areas.map(c => (
                    <ListItemButton key={c.name} component={Link} to={"/dashboard/area/" + countryID + "/" + c.href.split("/").slice(-2)[0]}>
                        <ListItemText primary={c.name} />
                    </ListItemButton>
                )) : "No Listed Areas"}
            </div>
        </>
    )
}
