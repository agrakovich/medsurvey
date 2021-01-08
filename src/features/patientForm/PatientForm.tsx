import React, { useCallback, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {
    patientFormSlice
} from './patientFormSlice';
import {
    selectName,
    selectSurname,
    selectPatronymic,
    selectDateOfBirth,
    selectDiagnosisCourse,
    selectDiagnosisForm,
    selectDiagnosisRespiratoryFailure,
    selectDiagnosisDegreeOfControl
} from './selectors';

const useStyles = makeStyles((theme: Theme) => ({
	wrapper: {
		padding: theme.spacing(3)
    },
    questionBlock: {
        display: 'flex',
        flexDirection: 'column'
    },
    questionText: {
        padding: theme.spacing(2)
    },
    formInput: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

interface PatientFormProps {
}

export const PatientForm: FunctionComponent<PatientFormProps> = ({}: PatientFormProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const name = useSelector(selectName);
    const surName = useSelector(selectSurname);
    const patronymic = useSelector(selectPatronymic);

    const dateOfBirth = useSelector(selectDateOfBirth);

    const diagnosisCourse = useSelector(selectDiagnosisCourse);
    const diagnosisForm = useSelector(selectDiagnosisForm);
    const diagnosisRespiratoryFailure = useSelector(selectDiagnosisRespiratoryFailure);
    const diagnosisDegreeOfControl = useSelector(selectDiagnosisDegreeOfControl);

    const setName = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
		dispatch(patientFormSlice.actions.setName(value));
    }, [dispatch]);

    const savePatientFormData = useCallback(() => {
		dispatch(patientFormSlice.actions.savePatientFormDataRequest());
    }, [dispatch]);

    const setSurname = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
		dispatch(patientFormSlice.actions.setSurName(value));
    }, [dispatch]);

    const setPatronymic = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
		dispatch(patientFormSlice.actions.setPatronymic(value));
    }, [dispatch]);

    const setDateOfBirth = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
		dispatch(patientFormSlice.actions.setDateOfBirth(value));
    }, [dispatch]);

    const setDiagnosisCourse = useCallback((changeEvent: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { value } = changeEvent.target as { name?: string; value: number };
		dispatch(patientFormSlice.actions.setDiagnosisCourse(value));
    }, [dispatch]);

    const setDiagnosisForm = useCallback((changeEvent: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { value } = changeEvent.target as { name?: string; value: number };
		dispatch(patientFormSlice.actions.setDiagnosisForm(value));
    }, [dispatch]);

    const setDiagnosisRespiratoryFailure = useCallback((changeEvent: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { value } = changeEvent.target as { name?: string; value: number };
		dispatch(patientFormSlice.actions.setDiagnosisRespiratoryFailure(value));
    }, [dispatch]);

    const setDiagnosisDegreeOfControl = useCallback((changeEvent: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { value } = changeEvent.target as { name?: string; value: number };
		dispatch(patientFormSlice.actions.setDiagnosisDegreeOfControl(value));
    }, [dispatch]);

	return (
    	<Box className={classes.wrapper}>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'1. Ваши фамилия, имя, отчество'}
                </Box>
                <TextField
                    required
                    id='surname'
                    label='Фамилия'
                    variant='outlined'
                    value={ surName }
                    onChange={ setSurname }
                    className={classes.formInput}
                />
                <TextField
                    required
                    id='name'
                    label='Имя'
                    variant='outlined'
                    value={ name }
                    onChange={ setName }
                    className={classes.formInput}
                />
                <TextField
                    required
                    id='patronymic'
                    label='Отчество'
                    variant='outlined'
                    value={ patronymic }
                    onChange={ setPatronymic }
                    className={classes.formInput}
                />
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'2. Укажите Ваш возраст'}
                </Box>
                <TextField
                    id='birthday'
                    label='Дата рождения'
                    type='date'
                    variant='outlined'
                    value={dateOfBirth}
                    onChange={setDateOfBirth}
                    required           
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'3. Укажите Ваш диагноз: Бронхиальная астма (J 45)'}
                </Box>
                <FormControl variant='outlined' className={classes.formInput}>
                    <InputLabel htmlFor='bronchial-asthma-form'>форма</InputLabel>
                    <Select
                        label='форма'
                        inputProps={{
                            name: 'form',
                            id: 'bronchial-asthma-form',
                        }}
                        value={diagnosisForm || 0}
                        onChange={setDiagnosisForm}
                    >
                        <option value={10}>{'Аллергическая (J 54.0)'}</option>
                        <option value={20}>{'Смешанная (J 54.8)'}</option>
                        <option value={30}>{'Неаллергическая (J 54.1)'}</option>
                    </Select>
                </FormControl>
                <FormControl variant='outlined' className={classes.formInput}>
                    <InputLabel htmlFor='bronchial-asthma-course'>течение</InputLabel>
                    <Select
                        label='течение'
                        inputProps={{
                            name: 'course',
                            id: 'bronchial-asthma-course',
                        }}
                        value={diagnosisCourse || 0}
                        onChange={setDiagnosisCourse}
                    >
                        <option value={10}>{'Лёгкое интермиттирующее'}</option>
                        <option value={20}>{'Лёгкое персистирующее'}</option>
                        <option value={30}>{'Средней тяжести'}</option>
                        <option value={40}>{'Тяжелое'}</option>
                    </Select>
                </FormControl>
                <FormControl variant='outlined' className={classes.formInput}>
                    <InputLabel htmlFor='bronchial-asthma-degree-of-control'>степень контроля (если астма впервые выявленная, то не указывается)</InputLabel>
                    <Select
                        label='степень контроля (если астма впервые выявленная, то не указывается)'
                        inputProps={{
                            name: 'course',
                            id: 'bronchial-asthma-degree-of-control',
                        }}
                        value={diagnosisDegreeOfControl || 0}
                        onChange={setDiagnosisDegreeOfControl}
                    >
                        <option value={10}>{'Контролируемая'}</option>
                        <option value={20}>{'Частично контролируемая'}</option>
                        <option value={30}>{'Неконтролируемая'}</option>
                    </Select>
                </FormControl>
                <FormControl variant='outlined' className={classes.formInput}>
                    <InputLabel htmlFor='bronchial-asthma-respiratory-failure'>{'ДН (дыхательная недостаточность)'}</InputLabel>
                    <Select
                        label='ДН (дыхательная недостаточность)'
                        inputProps={{
                            name: 'course',
                            id: 'bronchial-asthma-respiratory-failure',
                        }}
                        value={diagnosisRespiratoryFailure || 0}
                        onChange={setDiagnosisRespiratoryFailure}
                    >
                        <option value={10}>{'0'}</option>
                        <option value={20}>{'I'}</option>
                        <option value={30}>{'II'}</option>
                    </Select>
                </FormControl>
            </Box>
            <Button variant='contained' color='primary' onClick={savePatientFormData}>Сохранить</Button>
        </Box>
	);
};
