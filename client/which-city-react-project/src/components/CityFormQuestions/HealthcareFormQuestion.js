import React, { useEffect, useState } from 'react'
import { Grid, FormLabel, RadioGroup, Slider, FormControlLabel, Radio, Box, Container } from '@mui/material'
import FormSkeleton from '../FormSkeleton'
import "../../stylesheets/forms.css"
import { extractFloatValueFromResponse } from '../../helpers/uasValueExtraction'
import { filterNumericValues } from '../../helpers/formatting'

const HEALTHCARE_RADIO_GROUP_FORM_CONTROL_LABEL_WIDTH = 0.15

export default function HealthcareFormQuestion({ responses }) {
    const [loading, setLoading] = useState(false)

    const [minLifeExpectancy, setMinLifeExpectancy] = useState(null)
    const [maxLifeExpectancy, setMaxLifeExpectancy] = useState(null)

    const [healthcareCostAnswer, setHealthcareCostAnswer] = useState(null)
    const [healthcareQualityAnswer, setHealthcareQualityAnswer] = useState(null)
    const [lifeExpectancyAnswer, setLifeExpectancyAnswer] = useState(null)

    const questions = [
        {
            id: "healthcareCost",
            sessionStorageKey: "healthcareCostAnswer",
            answer: healthcareCostAnswer,
            setAnswer: setHealthcareCostAnswer,
            label: "Healthcare Cost",
            type: "radio"
        },
        {
            id: "healthcareQuality",
            sessionStorageKey: "healthcareQualityAnswer",
            answer: healthcareQualityAnswer,
            setAnswer: setHealthcareQualityAnswer,
            label: "Healthcare Quality",
            type: "radio"
        },
        {
            id: "lifeExpectancy",
            key: "HEALTHCARE-LIFE-EXPECTANCY",
            min: minLifeExpectancy,
            max: maxLifeExpectancy,
            setMin: setMinLifeExpectancy,
            setMax: setMaxLifeExpectancy,
            sessionStorageKey: "lifeExpectancyAnswer",
            answer: lifeExpectancyAnswer,
            setAnswer: setLifeExpectancyAnswer,
            label: "Life Expectancy",
            type: "slider"
        },
    ]

    useEffect(() => {
        questions.forEach(q => {
            const savedAnswer = sessionStorage.getItem(q.sessionStorageKey);
            if (savedAnswer && q.id != "lifeExpectancy") {
                q.setAnswer(savedAnswer)
            } else {
                q.setAnswer(Number(savedAnswer))
            }
        });
    }, []);

    useEffect(() => {
        setLoading(true)
        findMinMaxHealthcareValues()
            .then(() => setLoading(false))
            .catch(error => console.error(error));
    }, [responses])

    async function findMinMaxHealthcareValues() {

        questions.forEach(q => {
            if (q.id == "lifeExpectancy") {
                const min = Math.min(
                    ...filterNumericValues(
                        responses.map(response => extractFloatValueFromResponse(response, "HEALTHCARE", `${q.key}`))
                    )
                );
                const max = Math.max(
                    ...filterNumericValues(
                        responses.map(response => extractFloatValueFromResponse(response, "HEALTHCARE", `${q.key}`))
                    )
                );
                q.setMin(min);
                q.setMax(max);
            }
        })
    }

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
                                Healthcare
                            </FormLabel>
                        </Grid>
                        {questions.map(q => {
                            return (<Grid
                                key={q.id}
                                item xs={12}
                                sx={{ p: 10, borderBottom: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                <FormLabel
                                    htmlFor={`${q.id}-Cost`}
                                    sx={{
                                        fontWeight: '1000',
                                        color: 'black',
                                        fontSize: '1.5rem',
                                        textAlign: 'center',
                                        width: 0.3
                                    }}>
                                    {q.label}
                                </FormLabel>
                                {q.type === 'radio' ? (
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
                                                    width: HEALTHCARE_RADIO_GROUP_FORM_CONTROL_LABEL_WIDTH
                                                }}
                                            />
                                            <FormControlLabel
                                                value="of little importance"
                                                control={<Radio />}
                                                label="Of Little Importance"
                                                labelPlacement="top"
                                                sx={{
                                                    width: HEALTHCARE_RADIO_GROUP_FORM_CONTROL_LABEL_WIDTH
                                                }}
                                            />
                                            <FormControlLabel
                                                value="somewhat important"
                                                control={<Radio />}
                                                label="Somewhat Important"
                                                labelPlacement="top"
                                                sx={{
                                                    width: HEALTHCARE_RADIO_GROUP_FORM_CONTROL_LABEL_WIDTH
                                                }}
                                            />
                                            <FormControlLabel
                                                value="very important"
                                                control={<Radio />}
                                                label="Very Important"
                                                labelPlacement="top"
                                                sx={{
                                                    width: HEALTHCARE_RADIO_GROUP_FORM_CONTROL_LABEL_WIDTH
                                                }}
                                            />
                                        </RadioGroup>
                                    </Box>
                                ) : q.type === 'slider' ? (
                                    <Slider
                                        name={`${q.id}`}
                                        value={q.answer}
                                        onChange={handleChange}
                                        aria-label="Default"
                                        valueLabelDisplay="auto"
                                        min={Math.round(q.min) || 0}
                                        max={Math.round(q.max) || 0}
                                        step={0.1}
                                        marks={[
                                            { value: Math.round(q.min) || 0, label: `${Math.round(q.min)} years` },
                                            { value: Math.round(q.max) || 0, label: `${Math.round(q.max)} years` },
                                            {
                                                value: Math.round((q.max + q.min) / 2),
                                                label: `${Math.round((q.max + q.min) / 2)} years`,
                                            },
                                        ]}
                                        sx={{
                                            width: 0.6,
                                        }}
                                    />
                                ) : null}
                            </Grid>)
                        })}
                    </Grid>
                </Box>
            </Container>
        </>
    )
}
