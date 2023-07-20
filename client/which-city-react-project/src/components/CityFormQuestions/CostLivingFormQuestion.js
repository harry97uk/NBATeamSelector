import React, { useEffect, useState } from 'react'
import { Grid, FormLabel, Slider, Box, Container } from '@mui/material'
import { filterNumericValues } from '../../helpers/formatting';
import { extractDollarValueFromResponse } from '../../helpers/uasValueExtraction';
import FormSkeleton from '../FormSkeleton';
import "../../stylesheets/forms.css"

export default function CostLivingFormQuestion({ responses }) {
    const [loading, setLoading] = useState(true)

    const [minApplePrice, setMinApplePrice] = useState(null)
    const [maxApplePrice, setMaxApplePrice] = useState(null)
    const [minBreadPrice, setMinBreadPrice] = useState(null)
    const [maxBreadPrice, setMaxBreadPrice] = useState(null)
    const [minCappuccinoPrice, setMinCappuccinoPrice] = useState(null)
    const [maxCappuccinoPrice, setMaxCappuccinoPrice] = useState(null)
    const [minMovieTicketPrice, setMinMovieTicketPrice] = useState(null)
    const [maxMovieTicketPrice, setMaxMovieTicketPrice] = useState(null)
    const [minFitnessClubPrice, setMinFitnessClubPrice] = useState(null)
    const [maxFitnessClubPrice, setMaxFitnessClubPrice] = useState(null)
    const [minBeerPrice, setMinBeerPrice] = useState(null)
    const [maxBeerPrice, setMaxBeerPrice] = useState(null)
    const [minTransportPrice, setMinTransportPrice] = useState(null)
    const [maxTransportPrice, setMaxTransportPrice] = useState(null)
    const [minLunchPrice, setMinLunchPrice] = useState(null)
    const [maxLunchPrice, setMaxLunchPrice] = useState(null)
    const [minTaxiPrice, setMinTaxiPrice] = useState(null)
    const [maxTaxiPrice, setMaxTaxiPrice] = useState(null)
    const [minRestaurantPrice, setMinRestaurantPrice] = useState(null)
    const [maxRestaurantPrice, setMaxRestaurantPrice] = useState(null)

    const [applePriceAnswer, setApplePriceAnswer] = useState(0)
    const [breadPriceAnswer, setBreadPriceAnswer] = useState(0)
    const [cappuccinoPriceAnswer, setCappuccinoPriceAnswer] = useState(0)
    const [moviePriceAnswer, setMoviePriceAnswer] = useState(0)
    const [fitnessPriceAnswer, setFitnessPriceAnswer] = useState(0)
    const [beerPriceAnswer, setBeerPriceAnswer] = useState(0)
    const [transportPriceAnswer, setTransportPriceAnswer] = useState(0)
    const [lunchPriceAnswer, setLunchPriceAnswer] = useState(0)
    const [taxiPriceAnswer, setTaxiPriceAnswer] = useState(0)
    const [restaurantPriceAnswer, setRestaurantPriceAnswer] = useState(0)

    const questions = [
        {
            id: "apple",
            key: "COST-APPLES",
            sessionStorageKey: "applePriceAnswer",
            minPrice: minApplePrice,
            setMinPrice: setMinApplePrice,
            maxPrice: maxApplePrice,
            setMaxPrice: setMaxApplePrice,
            answer: applePriceAnswer,
            setAnswer: setApplePriceAnswer,
            label: "1kg Apples",
        },
        {
            id: "bread",
            key: "COST-BREAD",
            sessionStorageKey: "breadPriceAnswer",
            minPrice: minBreadPrice,
            setMinPrice: setMinBreadPrice,
            maxPrice: maxBreadPrice,
            setMaxPrice: setMaxBreadPrice,
            answer: breadPriceAnswer,
            setAnswer: setBreadPriceAnswer,
            label: "Loaf of Bread",
        },
        {
            id: "cappuccino",
            key: "COST-CAPPUCCINO",
            sessionStorageKey: "cappuccinoPriceAnswer",
            minPrice: minCappuccinoPrice,
            setMinPrice: setMinCappuccinoPrice,
            maxPrice: maxCappuccinoPrice,
            setMaxPrice: setMaxCappuccinoPrice,
            answer: cappuccinoPriceAnswer,
            setAnswer: setCappuccinoPriceAnswer,
            label: "A Cappuccino",
        },
        {
            id: "movieTicket",
            key: "COST-CINEMA",
            sessionStorageKey: "moviePriceAnswer",
            minPrice: minMovieTicketPrice,
            setMinPrice: setMinMovieTicketPrice,
            maxPrice: maxMovieTicketPrice,
            setMaxPrice: setMaxMovieTicketPrice,
            answer: moviePriceAnswer,
            setAnswer: setMoviePriceAnswer,
            label: "Cinema Ticket",
        },
        {
            id: "fitnessClub",
            key: "COST-FITNESS-CLUB",
            sessionStorageKey: "fitnessPriceAnswer",
            minPrice: minFitnessClubPrice,
            setMinPrice: setMinFitnessClubPrice,
            maxPrice: maxFitnessClubPrice,
            setMaxPrice: setMaxFitnessClubPrice,
            answer: fitnessPriceAnswer,
            setAnswer: setFitnessPriceAnswer,
            label: "Monthly Fitness Club Subscription",
        },
        {
            id: "beer",
            key: "COST-IMPORT-BEER",
            sessionStorageKey: "beerPriceAnswer",
            minPrice: minBeerPrice,
            setMinPrice: setMinBeerPrice,
            maxPrice: maxBeerPrice,
            setMaxPrice: setMaxBeerPrice,
            answer: beerPriceAnswer,
            setAnswer: setBeerPriceAnswer,
            label: "A Beer",
        },
        {
            id: "transport",
            key: "COST-PUBLIC-TRANSPORT",
            sessionStorageKey: "transportPriceAnswer",
            minPrice: minTransportPrice,
            setMinPrice: setMinTransportPrice,
            maxPrice: maxTransportPrice,
            setMaxPrice: setMaxTransportPrice,
            answer: transportPriceAnswer,
            setAnswer: setTransportPriceAnswer,
            label: "Monthly Public Transport Cost",
        },
        {
            id: "lunch",
            key: "COST-RESTAURANT-MEAL",
            sessionStorageKey: "lunchPriceAnswer",
            minPrice: minLunchPrice,
            setMinPrice: setMinLunchPrice,
            maxPrice: maxLunchPrice,
            setMaxPrice: setMaxLunchPrice,
            answer: lunchPriceAnswer,
            setAnswer: setLunchPriceAnswer,
            label: "Lunch at a Restaurant",
        },
        {
            id: "taxi",
            key: "COST-TAXI",
            sessionStorageKey: "taxiPriceAnswer",
            minPrice: minTaxiPrice,
            setMinPrice: setMinTaxiPrice,
            maxPrice: maxTaxiPrice,
            setMaxPrice: setMaxTaxiPrice,
            answer: taxiPriceAnswer,
            setAnswer: setTaxiPriceAnswer,
            label: "5km Taxi Ride",
        },
        {
            id: "restaurant",
            key: "RESTAURANT-PRICE-INDEX",
            sessionStorageKey: "restaurantPriceAnswer",
            minPrice: minRestaurantPrice,
            setMinPrice: setMinRestaurantPrice,
            maxPrice: maxRestaurantPrice,
            setMaxPrice: setMaxRestaurantPrice,
            answer: restaurantPriceAnswer,
            setAnswer: setRestaurantPriceAnswer,
            label: "Dinner at a Restaurant",
        },
    ];

    useEffect(() => {
        questions.forEach(q => {
            const savedAnswer = sessionStorage.getItem(q.sessionStorageKey);
            if (savedAnswer) {
                q.setAnswer(Number(savedAnswer))
            }
        });
    }, []);

    useEffect(() => {
        setLoading(true)
        findMinMaxCostLivingValues()
            .then(() => setLoading(false))
            .catch(error => console.error(error));
    }, [responses])

    async function findMinMaxCostLivingValues() {

        questions.forEach(q => {
            const minPrice = Math.min(
                ...filterNumericValues(
                    responses.map(response => extractDollarValueFromResponse(response, "COST-OF-LIVING", `${q.key}`))
                )
            );
            const maxPrice = Math.max(
                ...filterNumericValues(
                    responses.map(response => extractDollarValueFromResponse(response, "COST-OF-LIVING", `${q.key}`))
                )
            );
            q.setMinPrice(minPrice);
            q.setMaxPrice(maxPrice);
        })
    }

    const handleChange = (event, newValue) => {
        const q = questions.find(q => q.id + "-price" == event.target.name)

        q.setAnswer(newValue)
        sessionStorage.setItem(q.sessionStorageKey, newValue)

    };

    if (loading) return <FormSkeleton />

    return (
        <>
            <Container maxWidth="md">
                <Box my={4} component="form">
                    <Grid container>
                        <Grid
                            item xs={12}
                            sx={{ p: 10, borderBottom: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <FormLabel
                                sx={{
                                    fontWeight: '1000',
                                    color: 'black',
                                    fontSize: '4.5rem'
                                }}>
                                Cost Of Living
                            </FormLabel>
                        </Grid>
                        {questions.map(q => {
                            return (<Grid
                                key={q.id}
                                item xs={12}
                                sx={{ p: 10, borderBottom: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                <FormLabel
                                    htmlFor={`${q.id}-price`}
                                    sx={{
                                        fontWeight: '1000',
                                        color: 'black',
                                        fontSize: '1.5rem',
                                        textAlign: 'center',
                                        width: 0.3
                                    }}>
                                    {q.label}
                                </FormLabel>
                                <Slider
                                    name={`${q.id}-price`}
                                    value={q.answer}
                                    onChange={handleChange}
                                    aria-label="Default"
                                    valueLabelDisplay="auto"
                                    min={q.minPrice || 0}
                                    max={q.maxPrice || 0}
                                    step={0.1}
                                    marks={[
                                        { value: q.minPrice || 0, label: `$${q.minPrice}` },
                                        { value: q.maxPrice || 0, label: `$${q.maxPrice}` },
                                        {
                                            value: Math.round((q.maxPrice + q.minPrice) / 2),
                                            label: `$${Math.round((q.maxPrice + q.minPrice) / 2)}`,
                                        },
                                    ]}
                                    sx={{
                                        width: 0.6,
                                    }}
                                />
                            </Grid>)
                        })}
                    </Grid>
                </Box>
            </Container>
        </>
    )
}
