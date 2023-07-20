import React, { useEffect, useState } from 'react'
import { Grid, FormLabel, RadioGroup, FormControlLabel, Radio, Box, Container } from '@mui/material'
import FormSkeleton from '../FormSkeleton'
import "../../stylesheets/forms.css"

const EDUCATION_RADIO_GROUP_FORM_CONTROL_LABEL_WIDTH = 0.15

export default function EducationFormQuestion() {
    const [loading, setLoading] = useState(false)
    const [highSchoolHappinessAnswer, setHighSchoolHappinessAnswer] = useState(null)
    const [highSchoolMathPerformanceAnswer, setHighSchoolMathPerformanceAnswer] = useState(null)
    const [highSchoolReadingPerformanceAnswer, setHighSchoolReadingPerformanceAnswer] = useState(null)
    const [highSchoolSciencePerformanceAnswer, setHighSchoolSciencePerformanceAnswer] = useState(null)
    const [highSchoolOverallPerformanceAnswer, setHighSchoolOverallPerformanceAnswer] = useState(null)
    const [universityQualityAnswer, setUniversityQualityAnswer] = useState(null)

    const questions = [
        {
            id: "highSchoolHappiness",
            sessionStorageKey: "highSchoolHappinessAnswer",
            answer: highSchoolHappinessAnswer,
            setAnswer: setHighSchoolHappinessAnswer,
            label: "Happiness At High School",
        },
        {
            id: "highSchoolMathPerformance",
            sessionStorageKey: "highSchoolMathPerformanceAnswer",
            answer: highSchoolMathPerformanceAnswer,
            setAnswer: setHighSchoolMathPerformanceAnswer,
            label: "Math Performance At High School",
        },
        {
            id: "highSchoolReadingPerformance",
            sessionStorageKey: "highSchoolReadingPerformanceAnswer",
            answer: highSchoolReadingPerformanceAnswer,
            setAnswer: setHighSchoolReadingPerformanceAnswer,
            label: "Reading Performance At High School",
        },
        {
            id: "highSchoolSciencePerformance",
            sessionStorageKey: "highSchoolSciencePerformanceAnswer",
            answer: highSchoolSciencePerformanceAnswer,
            setAnswer: setHighSchoolSciencePerformanceAnswer,
            label: "Science Performance At High School",
        },
        {
            id: "highSchoolOverallPerformance",
            sessionStorageKey: "highSchoolOverallPerformanceAnswer",
            answer: highSchoolOverallPerformanceAnswer,
            setAnswer: setHighSchoolOverallPerformanceAnswer,
            label: "Overall Performance At High School",
        },
        {
            id: "universityQuality",
            sessionStorageKey: "universityQualityAnswer",
            answer: universityQualityAnswer,
            setAnswer: setUniversityQualityAnswer,
            label: "University Quality",
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
                                Education
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
                                                width: EDUCATION_RADIO_GROUP_FORM_CONTROL_LABEL_WIDTH
                                            }}
                                        />
                                        <FormControlLabel
                                            value="of little importance"
                                            control={<Radio />}
                                            label="Of Little Importance"
                                            labelPlacement="top"
                                            sx={{
                                                width: EDUCATION_RADIO_GROUP_FORM_CONTROL_LABEL_WIDTH
                                            }}
                                        />
                                        <FormControlLabel
                                            value="somewhat important"
                                            control={<Radio />}
                                            label="Somewhat Important"
                                            labelPlacement="top"
                                            sx={{
                                                width: EDUCATION_RADIO_GROUP_FORM_CONTROL_LABEL_WIDTH
                                            }}
                                        />
                                        <FormControlLabel
                                            value="very important"
                                            control={<Radio />}
                                            label="Very Important"
                                            labelPlacement="top"
                                            sx={{
                                                width: EDUCATION_RADIO_GROUP_FORM_CONTROL_LABEL_WIDTH
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
