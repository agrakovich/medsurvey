import React, { FunctionComponent } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Paper, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { Routes } from '../../Routes';

const useStyles = makeStyles((theme: Theme) => ({
	navigationButton: {
        padding: theme.spacing(3),
        margin: theme.spacing(2),
        width: '80%',
        maxWidth: '80%'
    },
    paperRoot: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center'
    }
}));

interface HomeProps {
}

export const Home: FunctionComponent<HomeProps> = ({}: HomeProps) => {
	const classes = useStyles();

	return (
    	<Paper id={'home-paper'} elevation={3} classes={{ root: classes.paperRoot }}>
            <Button
                className={classes.navigationButton}
                variant='outlined'
                color='primary'
                startIcon={<PersonAddIcon />}
                component={RouterLink}
                to={Routes.PatientForm}>
                { 'Ввести данные пациента' }
            </Button>
            <Button
                className={classes.navigationButton}
                variant='outlined'
                color='primary'
                startIcon={<PeopleIcon />}
                component={RouterLink}
                to={Routes.PatientsList}>
                { 'Список пациентов' }
            </Button>
		</Paper>
	);
};
