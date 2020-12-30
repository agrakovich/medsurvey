import { Box, Table, Theme, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import React, { FunctionComponent, useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
	navigationButton: {
		padding: theme.spacing(3)
	},
	table: {
		minWidth: 700,
	},
	container: {
		height: '90vh',
	}
}));

interface BasicPatientInfo {
	name: string,
	surname: string,
	patronymic: string,
	age: number
}

const rows: BasicPatientInfo[] = [
];

interface PatientsListProps {
}

export const PatientsList: FunctionComponent<PatientsListProps> = ({ }: PatientsListProps) => {
	const classes = useStyles();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Box>
			<TableContainer className={classes.container}>
				<Table className={classes.table}
					stickyHeader
					aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell>Фамилия</TableCell>
							<TableCell>Имя</TableCell>
							<TableCell>Отчество</TableCell>
							<TableCell>Возраст</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
							return (
								<TableRow key={idx + Date.now()}>
									<TableCell>{row.name}</TableCell>
									<TableCell>{row.surname}</TableCell>
									<TableCell>{row.patronymic}</TableCell>
									<TableCell>{row.age}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
				labelRowsPerPage="Строк на странице:"
			/>
		</Box>
	);
};
