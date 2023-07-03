import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function City() {
    const apiUrl = 'http://localhost:8000/api/city';
    const apiOptions = {
        params: {
            cityID: window.location.href.split("/").slice(-2)[1]
        }
    }

    const [city, setCity] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        axios.get(apiUrl, apiOptions)
            .then(response => {
                setCity(response.data)
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
                City
            </div>
            <div>
                <ListItemText primary={city.full_name} />
                <ListItemText primary={"Population: " + city.population} />
                <ListItemButton component={Link} to={"/dashboard/findclosest/" + city.geoname_id}>
                    <ListItemText primary={"Go to closest city with comparable data"} />
                </ListItemButton>
            </div>
        </>
    )
}
