import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { CircularProgress, Slider } from '@mui/material'
import { useAllUas } from '../CustomHooks/uaHook'

export default function ClimateFormQuestion() {
  const [uas, uasLoaded] = useAllUas()
  const [loading, setLoading] = useState(false)
  const [minMaxClimateValues, setMinMaxClimateValues] = useState([])

  const [minAverageDayLength, setMinAverageDayLength] = useState(null)
  const [maxAverageDayLength, setMaxAverageDayLength] = useState(null)

  const [minAverageNumberRainyDay, setMinAverageNumberRainyDay] = useState(null)
  const [maxAverageNumberRainyDay, setMaxAverageNumberRainyDay] = useState(null)

  const [minAverageHighTemp, setMinAverageHighTemp] = useState(null)
  const [maxAverageHighTemp, setMaxAverageHighTemp] = useState(null)

  const [minAverageLowTemp, setMinAverageLowTemp] = useState(null)
  const [maxAverageLowTemp, setMaxAverageLowTemp] = useState(null)

  const [minAverageSolarRadiation, setMinAverageSolarRadiation] = useState(null)
  const [maxAverageSolarRadiation, setMaxAverageSolarRadiation] = useState(null)

  function findMinMaxClimateValues() {
    const fetchUasClimateDataPromises = uas.map(async ua => {
      try {
        let uaSlugID = ua.name
        ua.name == "Galway" ? uaSlugID = "gaillimh" : uaSlugID = ua.name.toLowerCase().replaceAll(/\s/g,'-').replaceAll(/[,\.]/g, "")
        const response = await axios.get('http://localhost:8000/api/ua/details', {
          params: {
            uaID: "slug:" + uaSlugID
          }
        });

        if (minAverageDayLength || response.data.categories[2].data[0].float_value < minAverageDayLength) {
          console.log(response.data.categories[2].data[0].float_value);
          setMinAverageDayLength(response.data.categories[2].data[0].float_value)
        }
        if (maxAverageDayLength || response.data.categories[2].data[0].float_value > maxAverageDayLength) {
          console.log(response.data.categories[2].data[0]);
          setMaxAverageDayLength(response.data.categories[2].data[0].float_value)
        }

        return response

      } catch (error) {
        console.log(ua);
        console.error(error);
        return null;
      }
    })

    return Promise.all(fetchUasClimateDataPromises)

  }

  useEffect(() => {
    setLoading(true)
    findMinMaxClimateValues()
    .then(() => setLoading(false))
    .catch(error => console.error(error));
  }, [uas])


  if (loading) return <CircularProgress />

  return (
    <>
      <div>Climate</div>
      <div>
        <Slider defaultValue={minAverageDayLength || 0} aria-label="Default" valueLabelDisplay="auto" min={minAverageDayLength || 0} max={maxAverageDayLength || 0} />
      </div>
    </>
  )
}
