import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function CitiesList() {
    const apiUrl = 'http://localhost:8000/api/cities';
    const apiOptions = {
        params: {
            areaID: window.location.href.split("/").slice(-2)[1],
            countryID: window.location.href.split("/").slice(-3)[1]
        }
    }

    const [cities, setCities] = useState([])
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

    if (loading) return "Loading..."

    return (
        <>
            <div className='list-title'>
                Cities
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
