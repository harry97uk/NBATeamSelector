import React, { useEffect, useState } from 'react'
import { Grid, FormLabel, Slider, RadioGroup, FormControlLabel, Radio, Box, Container } from '@mui/material'
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

    const priceRanges = {
        apple: ["COST-APPLES", minApplePrice, setMinApplePrice, maxApplePrice, setMaxApplePrice],
        bread: ["COST-BREAD", minBreadPrice, setMinBreadPrice, maxBreadPrice, setMaxBreadPrice],
        cappuccino: ["COST-CAPPUCCINO", minCappuccinoPrice, setMinCappuccinoPrice, maxCappuccinoPrice, setMaxCappuccinoPrice],
        movieTicket: ["COST-CINEMA", minMovieTicketPrice, setMinMovieTicketPrice, maxMovieTicketPrice, setMaxMovieTicketPrice],
        fitnessClub: ["COST-FITNESS-CLUB", minFitnessClubPrice, setMinFitnessClubPrice, maxFitnessClubPrice, setMaxFitnessClubPrice],
        beer: ["COST-IMPORT-BEER", minBeerPrice, setMinBeerPrice, maxBeerPrice, setMaxBeerPrice],
        transport: ["COST-PUBLIC-TRANSPORT", minTransportPrice, setMinTransportPrice, maxTransportPrice, setMaxTransportPrice],
        lunch: ["COST-RESTAURANT-MEAL", minLunchPrice, setMinLunchPrice, maxLunchPrice, setMaxLunchPrice],
        taxi: ["COST-TAXI", minTaxiPrice, setMinTaxiPrice, maxTaxiPrice, setMaxTaxiPrice],
        restaurant: ["RESTAURANT-PRICE-INDEX", minRestaurantPrice, setMinRestaurantPrice, maxRestaurantPrice, setMaxRestaurantPrice]
    };

    const variables = {
        applePriceAnswer: setApplePriceAnswer,
        breadPriceAnswer: setBreadPriceAnswer,
        cappuccinoPriceAnswer: setCappuccinoPriceAnswer,
        moviePriceAnswer: setMoviePriceAnswer,
        fitnessPriceAnswer: setFitnessPriceAnswer,
        beerPriceAnswer: setBeerPriceAnswer,
        transportPriceAnswer: setTransportPriceAnswer,
        lunchPriceAnswer: setLunchPriceAnswer,
        taxiPriceAnswer: setTaxiPriceAnswer,
        restaurantPriceAnswer: setRestaurantPriceAnswer,
    };

    useEffect(() => {
        Object.entries(variables).forEach(([key, setter]) => {
            const savedAnswer = sessionStorage.getItem(key);
            if (savedAnswer) {
                setter(Number(savedAnswer))
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

        for (const [key, [id, minValue, setMinValue, maxValue, setMaxValue]] of Object.entries(priceRanges)) {
            const minPrice = Math.min(
                ...filterNumericValues(
                    responses.map(response => extractDollarValueFromResponse(response, "COST-OF-LIVING", `${id}`))
                )
            );
            const maxPrice = Math.max(
                ...filterNumericValues(
                    responses.map(response => extractDollarValueFromResponse(response, "COST-OF-LIVING", `${id}`))
                )
            );
            setMinValue(minPrice);
            setMaxValue(maxPrice);
        }
    }

    const handleChange = (event, newValue) => {
        switch (event.target.name) {
            case "apple-price":
                setApplePriceAnswer(newValue)
                sessionStorage.setItem("applePriceAnswer", newValue)
                break;
            default:
                break;
        }
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
                        <Grid
                            item xs={12}
                            sx={{ p: 10, borderBottom: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <FormLabel
                                htmlFor="apple-price"
                                sx={{
                                    fontWeight: '1000',
                                    color: 'black',
                                    fontSize: '1.5rem',
                                    textAlign: 'center'
                                }}>
                                1kg Apples
                            </FormLabel>
                            <Slider
                                name="apple-price"
                                value={applePriceAnswer}
                                onChange={handleChange}
                                aria-label="Default"
                                valueLabelDisplay="auto"
                                min={minApplePrice || 0}
                                max={maxApplePrice || 0}
                                step={0.1}
                                marks={[
                                    { value: minApplePrice, label: `$${minApplePrice}` },
                                    { value: maxApplePrice, label: `$${maxApplePrice}` },
                                    {
                                        value: Math.round((maxApplePrice + minApplePrice) / 2),
                                        label: `$${Math.round((maxApplePrice + minApplePrice) / 2)}`,
                                    },
                                ]}
                                sx={{
                                    width: 0.6,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}
