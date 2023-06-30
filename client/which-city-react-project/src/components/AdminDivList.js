import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function AdminDivList() {
    const apiUrl = 'http://localhost:8000/api/areas';
    const countryID = window.location.href.split("/").slice(-2)[1]
    const apiOptions = {
        params: {
            countryID: window.location.href.split("/").slice(-2)[1]
        }
    }

    const [areas, setAreas] = useState([])
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

    if (loading) return "Loading..."

    return (
        <>
            <div>
                Areas
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
