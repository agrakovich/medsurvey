import { Box, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import React, { FunctionComponent } from 'react';;

const useStyles = makeStyles((theme: Theme) => ({
	navigationButton: {
		padding: theme.spacing(3)
    }
}));

interface PatientsListProps {
}

export const PatientsList: FunctionComponent<PatientsListProps> = ({}: PatientsListProps) => {
	const classes = useStyles();

	return (
    	<Box>
            Список пациентов
		</Box>
	);
};
