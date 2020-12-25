import React, { FunctionComponent } from 'react';

import { Box, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
                    className={classes.formInput}
                />
                <TextField
                    required
                    id='name'
                    label='Имя'
                    variant='outlined'
                    className={classes.formInput}
                />
                <TextField
                    required
                    id='patronymic'
                    label='Отчество'
                    variant='outlined'
                    className={classes.formInput}
                />
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'2. Укажите Ваш возраст'}
                </Box>
                <TextField
                    id='age'
                    label='Возраст'
                    type='number'
                    variant='outlined'
                    inputProps={{
                        min: 0,
                        max: 250,
                        step: 1,
                        maxLength: 3
                    }}
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
                    >
                        <option aria-label='None' value='' />
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
                    >
                        <option aria-label='None' value='' />
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
                    >
                        <option aria-label='None' value='' />
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
                    >
                        <option aria-label='None' value='' />
                        <option value={10}>{'0'}</option>
                        <option value={20}>{'I'}</option>
                        <option value={30}>{'II'}</option>
                    </Select>
                </FormControl>
            </Box>
        </Box>
	);
};
