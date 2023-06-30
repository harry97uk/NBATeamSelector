import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function ContinentList() {
    const apiUrl = 'http://localhost:8000/api/continents';

    const [continents, setContinents] = useState([])
    const [loading, setLoading] = useState(true)

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

    if (loading) return "Loading..."

    return (
        <>
            <div>
                Continents
            </div>
            <div>
                {continents.map(c => (
                    <ListItemButton key={c.name} component={Link} to={"/dashboard/continent/" + c.href.split("/").slice(-2)[0]}>
                        <ListItemText primary={c.name} />
                    </ListItemButton>
                ))}
            </div>
        </>
    )
}
