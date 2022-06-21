import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Box, Table, Theme, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination, TextField, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from "@material-ui/icons/Search";


import { Routes } from '../../Routes';

import { send } from '../../app/messageControl';

import type { PatientData } from '../patientForm';

import { PatientDetailsRow } from './PatientDetailsRow';

const useStyles = makeStyles((theme: Theme) => ({
	navigationButton: {
		padding: theme.spacing(1),
		margin: theme.spacing(2)
	},
	table: {
		minWidth: 700,
	},
	container: {
		height: '90vh',
	}
}));

interface PatientRecord {
	id: string,
	name: string,
	surname: string,
	patronymic: string,
	dateOfBirth: string,
	dateOfAdding: string,
	survey: string
}
interface PatientsListProps {
}

export const PatientsList: FunctionComponent<PatientsListProps> = ({ }: PatientsListProps) => {
	const classes = useStyles();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const [rows, setRows] = useState<PatientData[]>([]);

	const [searchString, setSearchString] = useState<string>('');

	const changeSearchString = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
		setSearchString(value);
    }, []);

	const handleChangePage = useCallback((event: unknown, newPage: number) => {
		setPage(newPage);
	}, []);

	const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	}, []);

	useEffect(() => {
		send('SELECT * FROM Patients').then(patients => {
			const data = patients as PatientRecord[];
			const rows = data.map(p => {
				return {
					id: p.id,
					name: p.name,
					surname: p.surname,
					patronymic: p.patronymic,
					dateOfBirth: p.dateOfBirth,
					dateOfAdding: p.dateOfAdding,
					survey: JSON.parse(p.survey)
				};
			}) as PatientData[];
			setRows(rows);
		});
	}, []);

	const filteredRows = rows.filter(row =>
		!searchString || (
			row.name.toUpperCase().startsWith(searchString.toUpperCase()) ||
			row.surname.toUpperCase().startsWith(searchString.toUpperCase())
		));
	return (
		<Box>
			<Button
                className={classes.navigationButton}
                variant='outlined'
                color='primary'
                component={RouterLink}
                to={Routes.Home}>
                { 'Назад' }
            </Button>
			<Box px={2} py={3} width='40%'>
				<TextField
					label='Поиск'
					variant='outlined'
					fullWidth
					onChange={ changeSearchString }
					InputProps={{
						endAdornment: (
							<InputAdornment position='start' variant='outlined'>
								<SearchIcon />
							</InputAdornment>
							)
					}}
				/>
			</Box>
			<TableContainer className={classes.container}>
				<Table className={classes.table}
					stickyHeader
					aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell></TableCell>
							<TableCell>Фамилия</TableCell>
							<TableCell>Имя</TableCell>
							<TableCell>Отчество</TableCell>
							<TableCell>Дата рождения</TableCell>
							<TableCell>Дата заполнения</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
							return (
								<PatientDetailsRow key={`patient-details-${idx}`} {...row} />
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={filteredRows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
				labelRowsPerPage="Строк на странице:"
			/>
		</Box>
	);
};
