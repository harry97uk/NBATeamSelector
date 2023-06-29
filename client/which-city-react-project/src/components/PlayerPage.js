import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function PlayerPage() {
    const apiUrl = 'http://localhost:8000/api/players';
    const apiOptions = {
        params: {
            player_id: window.location.href.split('/')[window.location.href.split('/').length - 1],
        }
    }

    const [loading, setLoading] = useState(true)
    const [playerData, setPlayerData] = useState()

    useEffect(() => {
        setLoading(true)
        axios.get(apiUrl, apiOptions)
            .then(response => {
                setPlayerData(response.data)
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
                {playerData.first_name + " " + playerData.last_name}
            </div>
            <div>
                {playerData.height_feet != null ? playerData.height_feet + "' " + playerData.height_inches + "\"" : "Height Data Not Available"}
            </div>
            <div>
                {playerData.position}
            </div>
            <div>
                {playerData.team.full_name}
            </div>
        </>
    )
}
