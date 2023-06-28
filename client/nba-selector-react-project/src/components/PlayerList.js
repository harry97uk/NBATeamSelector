import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Pagination from './Pagination';

export default function PlayerList() {
    const apiUrl = 'http://localhost:8000/api/players';
    const apiOptions = {
        params: {
            page: 1,
            per_page: 25
        }
    }

    const [currentOptions, setCurrentOptions] = useState(apiOptions)
    const [nextPageNum, setNextPageNum] = useState()
    const [prevPageNum, setPrevPageNum] = useState()
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        axios.get(apiUrl, currentOptions)
            .then(response => {
                setPlayers(response.data.data)
                setNextPageNum(response.data.meta.next_page)
                setPrevPageNum(response.data.meta.current_page == 1 ? 1 : response.data.meta.current_page - 1)
                setLoading(false)
            })
            .catch(error => {
                console.error(error);
            });
    }, [currentOptions])

    function goToNextPage() {
        console.log(nextPageNum);
        setCurrentOptions({
            params: {
                page: nextPageNum,
                per_page: 25
            }
        })
    }

    function goToPrevPage() {
        setCurrentOptions({
            params: {
                page: prevPageNum,
                per_page: 25
            }
        })
    }

    if (loading) return "Loading..."

    return (
        <>
            <div>
                {players.map(p => (
                    <ListItemButton key={p.id} component={Link} to={"/dashboard/player/" + p.id}>
                        <ListItemText primary={p.first_name + " " + p.last_name} />
                    </ListItemButton>
                ))}
            </div>
            <Pagination
                goToNextPage={nextPageNum == null ? null : goToNextPage}
                goToPrevPage={nextPageNum == 2 ? null : goToPrevPage}
            />
        </>
    )
}
