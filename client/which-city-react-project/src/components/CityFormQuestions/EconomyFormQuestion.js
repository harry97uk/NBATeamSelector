import React, { useEffect, useState } from 'react'
import { Grid, FormLabel, RadioGroup, FormControlLabel, Radio, Box, Container } from '@mui/material'
import FormSkeleton from '../FormSkeleton'
import "../../stylesheets/forms.css"

const ECONOMY_RADIO_GROUP_FORM_CONTROL_LABEL_WIDTH = 0.15

export default function EconomyFormQuestion() {
    const [loading, setLoading] = useState(false)
    const [economyAnswer, setEconomyAnswer] = useState(null)

    const questions = [
        {
            id: "economy",
            sessionStorageKey: "economyAnswer",
            answer: economyAnswer,
            setAnswer: setEconomyAnswer,
            label: "Preferred Economy Type",
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
                                Economy
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
                                            value="does not matter"
                                            control={<Radio />}
                                            label="Doesn't Matter"
                                            labelPlacement="top"
                                            sx={{
                                                width: ECONOMY_RADIO_GROUP_FORM_CONTROL_LABEL_WIDTH
                                            }}
                                        />
                                        <FormControlLabel
                                            value="growing economy"
                                            control={<Radio />}
                                            label="Growing Economy"
                                            labelPlacement="top"
                                            sx={{
                                                width: ECONOMY_RADIO_GROUP_FORM_CONTROL_LABEL_WIDTH
                                            }}
                                        />
                                        <FormControlLabel
                                            value="established economy"
                                            control={<Radio />}
                                            label="Established Economy"
                                            labelPlacement="top"
                                            sx={{
                                                width: ECONOMY_RADIO_GROUP_FORM_CONTROL_LABEL_WIDTH
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
