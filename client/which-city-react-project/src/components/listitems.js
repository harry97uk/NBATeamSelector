import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton component={Link} to="/dashboard">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to="/dashboard/cityfinder">
            <ListItemIcon>
                <LocationCityIcon />
            </ListItemIcon>
            <ListItemText primary="Find A City For Me" />
        </ListItemButton>
        <ListItemButton component={Link} to="/dashboard/continentlist">
            <ListItemIcon>
                <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Explore" />
        </ListItemButton>
        <ListItemButton component={Link} to="/dashboard/squads">
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Stats?" />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Profile
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Sign In" />
        </ListItemButton>
    </React.Fragment>
);