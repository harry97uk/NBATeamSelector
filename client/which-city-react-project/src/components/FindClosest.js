import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function FindClosest() {
    const apiUrl = 'http://localhost:8000/api/uas';
    const apiOptions = {
        params: {
            uaID: ""
        }
    }

    const [uas, setUas] = useState([])
    const [relevantUas, setRelevantUas] = useState([])
    const [loading, setLoading] = useState(true)

    let uasData = []



    useEffect(() => {
        setLoading(true)

        axios.get(apiUrl, apiOptions)
            .then(response => {
                setUas(response.data._links['ua:item']);
                return response.data._links['ua:item'];
            })
            .then(uas => {
                // Part 2 goes here
                const fetchUasDataPromises = uas.map(ua => {
                    const uaID = ua.href.split("/").slice(-2)[0];
                    const currentApiOptions = {
                        params: { uaID }
                    };
                    return axios.get(apiUrl, currentApiOptions)
                        .then(response => {
                            const uaData = {
                                name: response.data.name,
                                area: response.data._links['ua:admin1-divisions'].length > 0 ? response.data._links['ua:admin1-divisions'][0].name : "Gibraltar",
                                continent: response.data._links['ua:continent'].name,
                                country: response.data._links['ua:countries'][0].name,
                                uaid: response.data.ua_id
                            };
                            return uaData;
                        })
                        .catch(error => {
                            console.error(error);
                            return null;
                        });
                });

                Promise.all(fetchUasDataPromises)
                    .then(uasData => {
                        // Part 3 goes here
                        const cityID = window.location.href.split("/").slice(-2)[1];

                        axios.get('http://localhost:8000/api/city', {
                            params: {
                                cityID: "geonameid:" + cityID
                            }
                        })
                            .then(response => {
                                let uas = uasData.filter(ua => ua.area === response.data.full_name.split(", ")[1] && ua.country === response.data.full_name.split(", ")[2]);
                                if (uas.length === 0) {
                                    uas = uasData.filter(ua => {
                                        return ua.country === response.data.full_name.split(", ")[2]
                                    });
                                }
                                // Use the filtered uas
                                setRelevantUas(uas)
                                setLoading(false)
                            })
                            .catch(error => {
                                console.error(error);
                            });

                    })
                    .catch(error => {
                        console.error(error);
                    });

            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    if (loading) return "Loading..."

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
