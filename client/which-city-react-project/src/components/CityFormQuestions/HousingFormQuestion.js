import React, { useEffect, useState } from 'react'
import { Grid, FormLabel, Slider, Box, Container } from '@mui/material'
import FormSkeleton from '../FormSkeleton'
import "../../stylesheets/forms.css"
import { extractDollarValueFromResponse } from '../../helpers/uasValueExtraction'
import { filterNumericValues } from '../../helpers/formatting'

export default function HousingFormQuestion({ responses }) {
  const [loading, setLoading] = useState(false)

  const [minSmallApartment, setMinSmallApartment] = useState(null)
  const [maxSmallApartment, setMaxSmallApartment] = useState(null)
  const [minMediumApartment, setMinMediumApartment] = useState(null)
  const [maxMediumApartment, setMaxMediumApartment] = useState(null)
  const [minLargeApartment, setMinLargeApartment] = useState(null)
  const [maxLargeApartment, setMaxLargeApartment] = useState(null)

  const [smallApartmentAnswer, setSmallApartmentAnswer] = useState(null)
  const [mediumApartmentAnswer, setMediumApartmentAnswer] = useState(null)
  const [largeApartmentAnswer, setLargeApartmentAnswer] = useState(null)

  const questions = [
    {
      id: "smallApartment",
      key: "APARTMENT-RENT-SMALL",
      min: minSmallApartment,
      max: maxSmallApartment,
      setMin: setMinSmallApartment,
      setMax: setMaxSmallApartment,
      sessionStorageKey: "smallApartmentAnswer",
      answer: smallApartmentAnswer,
      setAnswer: setSmallApartmentAnswer,
      label: "Small Apartment Price",
      type: "slider"
    },
    {
      id: "mediumApartment",
      key: "APARTMENT-RENT-MEDIUM",
      min: minMediumApartment,
      max: maxMediumApartment,
      setMin: setMinMediumApartment,
      setMax: setMaxMediumApartment,
      sessionStorageKey: "mediumApartmentAnswer",
      answer: mediumApartmentAnswer,
      setAnswer: setMediumApartmentAnswer,
      label: "Medium Apartment Price",
      type: "slider"
    },
    {
      id: "largeApartment",
      key: "APARTMENT-RENT-LARGE",
      min: minLargeApartment,
      max: maxLargeApartment,
      setMin: setMinLargeApartment,
      setMax: setMaxLargeApartment,
      sessionStorageKey: "largeApartmentAnswer",
      answer: largeApartmentAnswer,
      setAnswer: setLargeApartmentAnswer,
      label: "Large Apartment Price",
      type: "slider"
    },
  ]

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
    findMinMaxHousingValues()
      .then(() => setLoading(false))
      .catch(error => console.error(error));
  }, [responses])

  async function findMinMaxHousingValues() {

    questions.forEach(q => {
      const min = Math.min(
        ...filterNumericValues(
          responses.map(response => extractDollarValueFromResponse(response, "HOUSING", `${q.key}`))
        )
      );
      const max = Math.max(
        ...filterNumericValues(
          responses.map(response => extractDollarValueFromResponse(response, "HOUSING", `${q.key}`))
        )
      );
      q.setMin(min);
      q.setMax(max);

    })
  }

  const handleChange = (event, newValue) => {
    const q = questions.find(q => q.id + "Price" == event.target.name)

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
                Housing
              </FormLabel>
            </Grid>
            {questions.map(q => {
              return (<Grid
                key={q.id}
                item xs={12}
                sx={{ p: 10, borderBottom: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <FormLabel
                  htmlFor={`${q.id}Price`}
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
                  name={`${q.id}Price`}
                  value={q.answer}
                  onChange={handleChange}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  min={q.min || 0}
                  max={q.max || 0}
                  step={1}
                  marks={[
                    { value: q.min || 0, label: `$${q.min}` },
                    { value: q.max || 0, label: `$${q.max}` },
                    {
                      value: Math.round((q.max + q.min) / 2),
                      label: `$${Math.round((q.max + q.min) / 2)}`,
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
