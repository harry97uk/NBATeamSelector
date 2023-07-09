import { useEffect, useState } from 'react';
import axios from 'axios';

export function useSpecificUa() {

}

export function useAllRelevantUas() {
    const apiUrl = 'http://localhost:8000/api/uas';
    const apiOptions = {
        params: {
            uaID: ""
        }
    }

    const [relevantUas, setRelevantUas] = useState([])
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        fetchData()
            .then(uas => fetchUasData(uas))
            .then(uasData => filterUasData(uasData))
            .then(filteredUas => fetchCityData(filteredUas))
            .catch(error => console.error(error));
    }, []);

    async function fetchData() {
        const response = await axios.get(apiUrl, apiOptions);
        return response.data._links['ua:item'];
    }

    function fetchUasData(uas) {
        const fetchUasDataPromises = uas.map(async ua => {
            const uaID = ua.href.split("/").slice(-2)[0];
            const currentApiOptions = {
                params: { uaID }
            };

            try {
                const response = await axios.get(apiUrl, currentApiOptions);
                const uaData = {
                    name: response.data.name,
                    area: response.data._links['ua:admin1-divisions'].length > 0 ? response.data._links['ua:admin1-divisions'][0].name : "Gibraltar",
                    continent: response.data._links['ua:continent'].name,
                    country: response.data._links['ua:countries'][0].name,
                    uaid: response.data.ua_id
                };
                return uaData;
            } catch (error) {
                console.error(error);
                return null;
            }
        });

        return Promise.all(fetchUasDataPromises);
    }

    async function filterUasData(uasData) {
        const cityID = window.location.href.split("/").slice(-2)[1];

        return axios.get('http://localhost:8000/api/city', {
            params: {
                cityID: "geonameid:" + cityID
            }
        })
            .then(response => {
                const filteredUas = uasData.filter(ua => ua.area === response.data.full_name.split(", ")[1] && ua.country === response.data.full_name.split(", ")[2]);
                if (filteredUas.length === 0) {
                    return uasData.filter(ua => ua.country === response.data.full_name.split(", ")[2]);
                }
                return filteredUas;
            })
            .catch(error => {
                console.error(error);
                return [];
            });
    }

    async function fetchCityData(filteredUas) {
        return filterUasData(filteredUas)
            .then(uas => {
                setRelevantUas(uas)
                setLoading(false)
            })
    }

    return [relevantUas, loading]
}

export function useAllUas() {
    const apiUrl = 'http://localhost:8000/api/uas';
    const apiOptions = {
        params: {
            uaID: ""
        }
    }

    const [uas, setUas] = useState([])
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        fetchData()
            .then(uas => fetchUasData(uas))
            .catch(error => console.error(error));
    }, []);

    async function fetchData() {
        const response = await axios.get(apiUrl, apiOptions);
        return response.data._links['ua:item'];
    }

    async function fetchUasData(uas) {
        const fetchUasDataPromises = uas.map(async ua => {
            const uaID = ua.href.split("/").slice(-2)[0];
            const currentApiOptions = {
                params: { uaID }
            };

            try {
                const response = await axios.get(apiUrl, currentApiOptions);
                const uaData = {
                    name: response.data.name,
                    area: response.data._links['ua:admin1-divisions'].length > 0 ? response.data._links['ua:admin1-divisions'][0].name : "Gibraltar",
                    continent: response.data._links['ua:continent'].name,
                    country: response.data._links['ua:countries'][0].name,
                    uaid: response.data.ua_id
                };
                return uaData;
            } catch (error) {
                console.error(error);
                return null;
            }
        });

        setUas(await Promise.all(fetchUasDataPromises));
        setLoading(false)
    }

    return [uas, loading]
}