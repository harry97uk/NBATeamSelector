import React, { useEffect, useState } from 'react'
import { Grid, FormLabel, RadioGroup, FormControlLabel, Radio, Box, Container } from '@mui/material'
import FormSkeleton from '../FormSkeleton'
import "../../stylesheets/forms.css"

const CULTURE_RADIO_GROUP_FORM_CONTROL_LABEL_WIDTH = 0.15

export default function CultureFormQuestion() {
    const [loading, setLoading] = useState(false)
    const [artGalleriesAnswer, setArtGalleriesAnswer] = useState(null)
    const [cinemaAnswer, setCinemaAnswer] = useState(null)
    const [comedyClubsAnswer, setComedyClubsAnswer] = useState(null)
    const [concertsAnswer, setConcertsAnswer] = useState(null)
    const [historicalSitesAnswer, setHistoricalSitesAnswer] = useState(null)
    const [museumsAnswer, setMuseumsAnswer] = useState(null)
    const [performingArtsAnswer, setPerformingArtsAnswer] = useState(null)
    const [sportsAnswer, setSportsAnswer] = useState(null)
    const [zoosAnswer, setZoosAnswer] = useState(null)

    const questions = [
        {
            id: "artGalleries",
            key: "CULTURE-ART-GALLERIES-TELESCORE",
            sessionStorageKey: "artGalleriesAnswer",
            answer: artGalleriesAnswer,
            setAnswer: setArtGalleriesAnswer,
            label: "Art Galleries",
        },
        {
            id: "cinema",
            key: "CULTURE-CINEMA-TELESCORE",
            sessionStorageKey: "cinemaAnswer",
            answer: cinemaAnswer,
            setAnswer: setCinemaAnswer,
            label: "Cinema",
        },
        {
            id: "comedyClubs",
            key: "CULTURE-COMEDY-CLUBS-TELESCORE",
            sessionStorageKey: "comedyClubsAnswer",
            answer: comedyClubsAnswer,
            setAnswer: setComedyClubsAnswer,
            label: "Comedy Clubs",
        },
        {
            id: "concerts",
            key: "CULTURE-CONCERTS-TELESCORE",
            sessionStorageKey: "concertsAnswer",
            answer: concertsAnswer,
            setAnswer: setConcertsAnswer,
            label: "Concerts",
        },
        {
            id: "historicalSites",
            key: "CULTURE-HISTORICAL-SITES-TELESCORE",
            sessionStorageKey: "historicalSitesAnswer",
            answer: historicalSitesAnswer,
            setAnswer: setHistoricalSitesAnswer,
            label: "Historical Sites",
        },
        {
            id: "museums",
            key: "CULTURE-MUSEUMS-TELESCORE",
            sessionStorageKey: "museumsAnswer",
            answer: museumsAnswer,
            setAnswer: setMuseumsAnswer,
            label: "Museums",
        },
        {
            id: "performingArts",
            key: "CULTURE-PERFORMING-ARTS-TELESCORE",
            sessionStorageKey: "performingArtsAnswer",
            answer: performingArtsAnswer,
            setAnswer: setPerformingArtsAnswer,
            label: "Performing Arts",
        },
        {
            id: "sports",
            key: "CULTURE-SPORTS-TELESCORE",
            sessionStorageKey: "sportsAnswer",
            answer: sportsAnswer,
            setAnswer: setSportsAnswer,
            label: "Sports",
        },
        {
            id: "zoos",
            key: "CULTURE-ZOOS-TELESCORE",
            sessionStorageKey: "zoosAnswer",
            answer: zoosAnswer,
            setAnswer: setZoosAnswer,
            label: "Zoos",
        },
    ]

    useEffect(() => {
        questions.forEach(q => {
            const savedAnswer = sessionStorage.getItem(q.sessionStorageKey);
            if (savedAnswer) {
                q.setAnswer(savedAnswer)
            }
        });
    }, []);

    const handleChange = (event, newValue) => {
        const q = questions.find(q => q.id == event.target.name)

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
                                Culture
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
                                <Box>
                                    <RadioGroup
                                        row
                                        name={q.id}
                                        value={q.answer}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 0.9,
                                        }}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel
                                            value="not very important"
                                            control={<Radio />}
                                            label="Not Very Important"
                                            labelPlacement="top"
                                            sx={{
                                                width: CULTURE_RADIO_GROUP_FORM_CONTROL_LABEL_WIDTH
                                            }}
                                        />
                                        <FormControlLabel
                                            value="of little importance"
                                            control={<Radio />}
                                            label="Of Little Importance"
                                            labelPlacement="top"
                                            sx={{
                                                width: CULTURE_RADIO_GROUP_FORM_CONTROL_LABEL_WIDTH
                                            }}
                                        />
                                        <FormControlLabel
                                            value="somewhat important"
                                            control={<Radio />}
                                            label="Somewhat Important"
                                            labelPlacement="top"
                                            sx={{
                                                width: CULTURE_RADIO_GROUP_FORM_CONTROL_LABEL_WIDTH
                                            }}
                                        />
                                        <FormControlLabel
                                            value="very important"
                                            control={<Radio />}
                                            label="Very Important"
                                            labelPlacement="top"
                                            sx={{
                                                width: CULTURE_RADIO_GROUP_FORM_CONTROL_LABEL_WIDTH
                                            }}
                                        />
                                    </RadioGroup>
                                </Box>
                            </Grid>)
                        })}
                    </Grid>
                </Box>
            </Container>
        </>
    )
}
