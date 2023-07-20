import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { formatSlugID } from '../helpers/formatting'
import { CircularProgress, Container, Tab, Tabs, Box } from '@mui/material';
import ClimateFormQuestion from './CityFormQuestions/ClimateFormQuestion'
import { useAllUas } from './CustomHooks/uaHook';
import CostLivingFormQuestion from './CityFormQuestions/CostLivingFormQuestion';
import CultureFormQuestion from './CityFormQuestions/CultureFormQuestion';
import EconomyFormQuestion from './CityFormQuestions/EconomyFormQuestion';
import EducationFormQuestion from './CityFormQuestions/EducationFormQuestion';
import HealthcareFormQuestion from './CityFormQuestions/HealthcareFormQuestion';

export default function CityForm() {
  const [loading, setLoading] = useState(true)
  const [uas, uasLoading] = useAllUas()
  const [uasResponses, setUasResponses] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const finalPage = 10

  async function fetchUasData(ua) {
    try {
      const uaSlugID = formatSlugID(ua);
      const response = await axios.get('http://localhost:8000/api/ua/details', {
        params: {
          uaID: "slug:" + uaSlugID,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function fetchUasResponses() {
    const fetchUasClimateDataPromises = uas.map(fetchUasData);
    const responses = await Promise.all(fetchUasClimateDataPromises);
    return responses
  }

  const renderQuestions = () => {
    switch (currentPage) {
      case 0:
        return <ClimateFormQuestion responses={uasResponses} />
      case 1:
        return <CostLivingFormQuestion responses={uasResponses} />
      case 2:
        return <CultureFormQuestion />
      case 3:
        return <EconomyFormQuestion />
      case 4:
        return <EducationFormQuestion />
      case 5:
        return <HealthcareFormQuestion responses={uasResponses} />
      // Add cases for other pages/routes
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!uasLoading) {
      fetchUasResponses()
        .then((responses) => {
          setUasResponses(responses)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [uasLoading])

  useEffect(() => {
    const savedPage = sessionStorage.getItem('currentPage');

    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10));
    }
  }, []);

  const handleChange = (event, newValue) => {
    setCurrentPage(newValue);
    sessionStorage.setItem('currentPage', newValue);
  };

  if (loading) return (
    <>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    </>
  )

  return (
    <>
      <div style={{ textAlign: 'center' }}>CityForm</div>
      <Container
        maxWidth="lg"
        sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={currentPage}
            onChange={handleChange}
            aria-label="city form tabs"
            variant="scrollable"
            scrollButtons="auto">
            <Tab label="Climate" />
            <Tab label="Cost Of Living" />
            <Tab label="Culture" />
            <Tab label="Economy" />
            <Tab label="Education" />
            <Tab label="Healthcare" />
            <Tab label="Housing" />
            <Tab label="Job Market" />
            <Tab label="Language" />
            <Tab label="Tolerance" />
            <Tab label="Internet Access" />
            <Tab label="Outdoors" />
            <Tab label="Pollution" />
            <Tab label="Safety" />
            <Tab label="Startups" />
            <Tab label="Taxation" />
            <Tab label="Traffic" />
            <Tab label="Public Transport" />
            <Tab label="City Size" />
            <Tab label="Business Freedom" />
            <Tab label="Venture Capital" />
          </Tabs>
        </Box>
        {renderQuestions()}
      </Container>
    </>
  )
}
