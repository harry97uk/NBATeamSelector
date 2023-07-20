import React, { useEffect, useState } from 'react'
import { Grid, FormLabel, Slider, RadioGroup, FormControlLabel, Radio, Box, Container } from '@mui/material'
import FormSkeleton from '../FormSkeleton';
import { convertStringToNumber, filterNumericValues } from '../../helpers/formatting'
import { extractStringValueFromResponse } from '../../helpers/uasValueExtraction';
import "../../stylesheets/forms.css"

export default function ClimateFormQuestion({ responses }) {
  const [loading, setLoading] = useState(true)

  const [minAverageHighTemp, setMinAverageHighTemp] = useState(null)
  const [maxAverageHighTemp, setMaxAverageHighTemp] = useState(null)

  const [minAverageLowTemp, setMinAverageLowTemp] = useState(null)
  const [maxAverageLowTemp, setMaxAverageLowTemp] = useState(null)

  const [sunlightAnswer, setSunlightAnswer] = useState(null)
  const [rainAnswer, setRainAnswer] = useState(null)
  const [winterTemperatureAnswer, setWinterTemperatureAnswer] = useState(0)
  const [summerTemperatureAnswer, setSummerTemperatureAnswer] = useState(0)

  const variables = {
    sunlightAnswer: setSunlightAnswer,
    rainAnswer: setRainAnswer,
    winterTemperatureAnswer: setWinterTemperatureAnswer,
    summerTemperatureAnswer: setSummerTemperatureAnswer
  };

  useEffect(() => {
    setLoading(true)
    findMinMaxClimateValues()
      .then(() => setLoading(false))
      .catch(error => console.error(error));
  }, [responses])

  useEffect(() => {
    Object.entries(variables).forEach(([key, setter]) => {
      const savedAnswer = sessionStorage.getItem(key);
      if (savedAnswer) {
        if (key == "winterTemperatureAnswer" || key == "summerTemperatureAnswer") {
          setter(Number(savedAnswer))
        } else {
          setter(savedAnswer);
        }
      }
    });
  }, []);

  async function findMinMaxClimateValues() {

    const minLowTemp = Math.min(
      ...filterNumericValues(
        responses.map((response) => convertStringToNumber(extractStringValueFromResponse(response, "CLIMATE", "WEATHER-AVERAGE-LOW")))
      )
    );
    const maxLowTemp = Math.max(
      ...filterNumericValues(
        responses.map((response) => convertStringToNumber(extractStringValueFromResponse(response, "CLIMATE", "WEATHER-AVERAGE-LOW")))
      )
    );
    const minHighTemp = Math.min(
      ...filterNumericValues(
        responses.map((response) => convertStringToNumber(extractStringValueFromResponse(response, "CLIMATE", "WEATHER-AVERAGE-HIGH")))
      )
    );
    const maxHighTemp = Math.max(
      ...filterNumericValues(
        responses.map((response) => convertStringToNumber(extractStringValueFromResponse(response, "CLIMATE", "WEATHER-AVERAGE-HIGH")))
      )
    );

    setMinAverageLowTemp(minLowTemp);
    setMaxAverageLowTemp(maxLowTemp);
    setMinAverageHighTemp(minHighTemp);
    setMaxAverageHighTemp(maxHighTemp);

  }

  const handleChange = (event, newValue) => {
    switch (event.target.name) {
      case "sunlight":
        setSunlightAnswer(newValue)
        sessionStorage.setItem("sunlightAnswer", newValue)
        break;
      case "rain":
        setRainAnswer(newValue)
        sessionStorage.setItem("rainAnswer", newValue)
        break;
      case "winter-temp":
        setWinterTemperatureAnswer(newValue)
        sessionStorage.setItem("winterTemperatureAnswer", newValue)
        break;
      case "summer-temp":
        setSummerTemperatureAnswer(newValue)
        sessionStorage.setItem("summerTemperatureAnswer", newValue)
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
                Climate
              </FormLabel>
            </Grid>
            <Grid
              item xs={12}
              sx={{ p: 10, borderBottom: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <Box>
                <FormLabel
                  htmlFor="sunlight"
                  sx={{
                    fontWeight: '1000',
                    color: 'black',
                    fontSize: '1.5rem',
                    width: 0.3,
                    textAlign: 'center'
                  }}>
                  Sunlight
                </FormLabel>
              </Box>
              <Box>
                <RadioGroup
                  row
                  name="sunlight"
                  value={sunlightAnswer}
                  sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="darker"
                    control={<Radio />}
                    label="Darker"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="i dont mind"
                    control={<Radio />}
                    label="I Don't Mind"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="lighter"
                    control={<Radio />}
                    label="Lighter"
                    labelPlacement="top"
                  />
                </RadioGroup>
              </Box>
            </Grid>
            <Grid
              item xs={12}
              sx={{ p: 10, borderBottom: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <FormLabel
                htmlFor="rain"
                sx={{
                  fontWeight: '1000',
                  color: 'black',
                  fontSize: '1.5rem',
                  width: 0.3,
                  textAlign: 'center'
                }}>
                Rain
              </FormLabel>
              <RadioGroup
                row
                name="rain"
                value={rainAnswer}
                onChange={handleChange}
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 0.5 }}
              >
                <FormControlLabel
                  value="rainy"
                  control={<Radio />}
                  label="Rainy"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="i dont mind"
                  control={<Radio />}
                  label="I Don't Mind"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="dry"
                  control={<Radio />}
                  label="Dry"
                  labelPlacement="top"
                />
              </RadioGroup>
            </Grid>
            <Grid
              item xs={12}
              sx={{ p: 10, borderBottom: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <FormLabel
                htmlFor="winter-temp"
                sx={{
                  fontWeight: '1000',
                  color: 'black',
                  fontSize: '1.5rem',
                  textAlign: 'center',
                  width: 0.3
                }}>
                Preferred Winter Temperature
              </FormLabel>
              <Slider
                name="winter-temp"
                value={winterTemperatureAnswer}
                onChange={handleChange}
                aria-label="Default"
                valueLabelDisplay="auto"
                min={minAverageLowTemp || 0}
                max={maxAverageLowTemp || 0}
                step={0.1}
                marks={[
                  { value: 0, label: '0°C' },
                  { value: 20, label: '20°C' },
                  { value: minAverageLowTemp || 0, label: `${minAverageLowTemp}°C` },
                  { value: maxAverageLowTemp || 0, label: `${maxAverageLowTemp}°C` },
                  {
                    value: Math.round((maxAverageLowTemp + minAverageLowTemp) / 2),
                    label: `${Math.round((maxAverageLowTemp + minAverageLowTemp) / 2)}°C`,
                  },
                ]}
                sx={{
                  width: 0.6
                }}
              />
            </Grid>
            <Grid
              item xs={12}
              sx={{ p: 10, borderBottom: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <FormLabel
                htmlFor="summer-temp"
                sx={{
                  fontWeight: '1000',
                  color: 'black',
                  fontSize: '1.5rem',
                  textAlign: 'center',
                  width: 0.3
                }}>
                Preferred Summer Temperature
              </FormLabel>
              <Slider
                name="summer-temp"
                value={summerTemperatureAnswer}
                onChange={handleChange}
                aria-label="Default"
                valueLabelDisplay="auto"
                min={minAverageHighTemp || 0}
                max={maxAverageHighTemp || 0}
                step={0.1}
                marks={[
                  { value: 10, label: '10°C' },
                  { value: 25, label: '25°C' },
                  { value: minAverageHighTemp || 0, label: `${minAverageHighTemp}°C` },
                  { value: maxAverageHighTemp || 0, label: `${maxAverageHighTemp}°C` },
                  {
                    value: Math.round((maxAverageHighTemp + minAverageHighTemp) / 2),
                    label: `${Math.round((maxAverageHighTemp + minAverageHighTemp) / 2)}°C`,
                  },
                ]}
                sx={{
                  width: 0.6
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}
