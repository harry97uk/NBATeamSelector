import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { CircularProgress } from '@mui/material';
import { useAllRelevantUas } from './CustomHooks/uaHook';

export default function FindClosest() {
    const [relevantUas, loading] = useAllRelevantUas();
    
    if (loading) return <CircularProgress />

    return (
        <>
            <div className='list-title'>
                Urban Areas
            </div>
            <div>
                {relevantUas.length > 0 ? relevantUas.map(ua => (
                    <ListItemButton key={ua.name} component={Link} to={"/dashboard/city/" + ua.uaid}>
                        <ListItemText primary={ua.name + ", " + ua.country} />
                    </ListItemButton>
                )) : "No Relative Urban Area Available"}
            </div>
        </>
    );
}
