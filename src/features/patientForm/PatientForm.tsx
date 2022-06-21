import React, { useCallback, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import MuiAlert from '@material-ui/lab/Alert';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';

import { Routes } from '../../Routes';
import { calculateBMI } from '../../app/utils';

import {
    patientFormSlice
} from './patientFormSlice';
import {
    patientFormViewSlice
} from './patientFormViewSlice';
import {
    selectPatientData,
    selectIsSavedSuccess,
    selectIsSavedFailure
} from './selectors';
import {
    ImmunotherapyMethods,
    Pharmacotherapy,
    EffectOfTreatmentWithAllergensOptions,
    ImpactOnWorkFunctionsOptions,
    DifficultyBreathingOptions,
    DiagnosisForms,
    DiagnosisCourses,
    DiagnosisDegreesOfControl,
    DiagnosisRespiratoryFailures,
    WakeUpFrequencyOptions,
    InhalerUseFrequencyOptions,
    DegreeOfControlOptions
} from '../../app/constants';

const useStyles = makeStyles((theme: Theme) => ({
    navigationButton: {
		padding: theme.spacing(1),
		margin: theme.spacing(2)
	},

	wrapper: {
		padding: theme.spacing(3)
    },
    questionBlock: {
        display: 'flex',
        flexDirection: 'column'
    },
    questionText: {
        padding: theme.spacing(2),
        fontWeight: 'bold'
    },
    formInput: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    spirogramInputWrapper: {
        display: 'flex',
        flexDirection: 'row'
    },
    spirogramInputLabel: {
        alignSelf: 'center',
        width: '8%'
    },
    actionButton: {
        marginRight: theme.spacing(1),
        padding: theme.spacing(2)
    },

    astResultFullControl: {
        color: '#62E980'
    },
    astResultPartialControl: {
        color: '#FFC300'
    },
    astResultNoControl: {
        color: '#FF3333'
    }
}));

interface PatientFormProps {
}

export const PatientForm: FunctionComponent<PatientFormProps> = ({}: PatientFormProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const patientData = useSelector(selectPatientData);
    const isSavedSuccess = useSelector(selectIsSavedSuccess);
    const isSavedFailure = useSelector(selectIsSavedFailure);

    const resetIsSaved = useCallback(() => {
		dispatch(patientFormViewSlice.actions.resetIsSaved);
    }, [dispatch]);

    const setName = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
		dispatch(patientFormSlice.actions.setName(value));
    }, [dispatch]);

    const savePatientFormData = useCallback(() => {
		dispatch(patientFormViewSlice.actions.savePatientFormDataRequest());
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

    const setLengthOfIllness = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
        dispatch(patientFormSlice.actions.setLengthOfIllness(Number(value)));
    }, [dispatch]);

    const getUpdateImmunotherapyMethods = useCallback((method: number) => {
        return (event: React.ChangeEvent, checked: boolean) => checked
            ? dispatch(patientFormSlice.actions.checkImmunotherapyMethod(method))
            : dispatch(patientFormSlice.actions.uncheckImmunotherapyMethod(method));
    }, [dispatch]);

    const getUpdatePharmacotherapy = useCallback((method: number) => {
        return (event: React.ChangeEvent, checked: boolean) => checked
            ? dispatch(patientFormSlice.actions.checkPharmacotherapy(method))
            : dispatch(patientFormSlice.actions.uncheckPharmacotherapy(method));
    }, [dispatch]);

    const setEffectOfTreatmentWithAllergens = useCallback((changeEvent: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { value } = changeEvent.target as { name?: string; value: number };
		dispatch(patientFormSlice.actions.setEffectOfTreatmentWithAllergens(value));
    }, [dispatch]);

    const setImpactOnWorkFunctions = useCallback((changeEvent: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { value } = changeEvent.target as { name?: string; value: number };
		dispatch(patientFormSlice.actions.setImpactOnWorkFunctions(value));
    }, [dispatch]);

    const setDifficultyBreathing = useCallback((changeEvent: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { value } = changeEvent.target as { name?: string; value: number };
		dispatch(patientFormSlice.actions.setDifficultyBreathing(value));
    }, [dispatch]);

    const setWakeUpFrequency = useCallback((changeEvent: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { value } = changeEvent.target as { name?: string; value: number };
		dispatch(patientFormSlice.actions.setWakeUpFrequency(value));
    }, [dispatch]);

    const setInhalerUseFrequency = useCallback((changeEvent: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { value } = changeEvent.target as { name?: string; value: number };
		dispatch(patientFormSlice.actions.setInhalerUseFrequency(value));
    }, [dispatch]);   
    
    const setDegreeOfControl = useCallback((changeEvent: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { value } = changeEvent.target as { name?: string; value: number };
		dispatch(patientFormSlice.actions.setDegreeOfControl(value));
    }, [dispatch]);

    const setAgeWhenWasDiagnosed = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
        dispatch(patientFormSlice.actions.setAgeWhenWasDiagnosed(Number(value)));
    }, [dispatch]);

    const setIsFixedRespiratoryTractObstruction = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsFixedRespiratoryTractObstruction(value));
    }, [dispatch]);

    const setIsLateStart = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsLateStart(value));
    }, [dispatch]);

    const setIsHardCourse = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsHardCourse(value));
    }, [dispatch]);

    const setIsThereContactWithAllergens = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsThereContactWithAllergens(value));
    }, [dispatch]);

    const setIsPolysensitizationToAllergens = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsPolysensitizationToAllergens(value));
    }, [dispatch]);

    const setIsAllergicPathology = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsAllergicPathology(value));
    }, [dispatch]);

    const setIsCorrectInhalationTechnique = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsCorrectInhalationTechnique(value));
    }, [dispatch]);

    const setIsChronicObstructivePulmonaryDisease = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsChronicObstructivePulmonaryDisease(value));
    }, [dispatch]);

    const setIsFollowRecommendedMode = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsFollowRecommendedMode(value));
    }, [dispatch]);

    const setIsSmoker = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsSmoker(value));
    }, [dispatch]);

    const setIsContinueContactWithAllergens = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsContinueContactWithAllergens(value));
    }, [dispatch]);

    const setWeight = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
        dispatch(patientFormSlice.actions.setWeight(Number(value)));
    }, [dispatch]);
    
    const setHeight = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
        dispatch(patientFormSlice.actions.setHeight(Number(value)));
    }, [dispatch]);

    const setIsAllergenTreatmentBefore = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsAllergenTreatmentBefore(value));
    }, [dispatch]);

    const setIsLateStartTreatmentWithAllergens = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsLateStartTreatmentWithAllergens(value));
    }, [dispatch]);

    const setIsAutoserotherapyPerformedBefore = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsAutoserotherapyPerformedBefore(value));
    }, [dispatch]);

    const setIsVariationInPeakExpiratoryFlowGreater20 = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsVariationInPeakExpiratoryFlowGreater20(value));
    }, [dispatch]);

    const setIsIntercurrentUpperRespiratoryTractInfections = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsIntercurrentUpperRespiratoryTractInfections(value));
    }, [dispatch]);

    const setIsUndesirableSideEffectsOfDrugs = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsUndesirableSideEffectsOfDrugs(value));
    }, [dispatch]);

    const setIsNotPrescribedInhaledGlucocorticosteroids = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsNotPrescribedInhaledGlucocorticosteroids(value));
    }, [dispatch]);

    const setIsUsedIneffectiveDosesOfInhaledGlucocorticosteroids = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsUsedIneffectiveDosesOfInhaledGlucocorticosteroids(value));
    }, [dispatch]);

    const setIsForgotToTakeMedicationsForTreatment = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsForgotToTakeMedicationsForTreatment(value));
    }, [dispatch]);

    const setIsSometimesInattentiveToTheHoursOfMedications = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsSometimesInattentiveToTheHoursOfMedications(value));
    }, [dispatch]);

    const setIsSkipMedicationsIfFeelWell = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsSkipMedicationsIfFeelWell(value));
    }, [dispatch]);

    const setIsMissNextMedicationsIfFeelBad = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'true';
        dispatch(patientFormSlice.actions.setIsMissNextMedicationsIfFeelBad(value));
    }, [dispatch]);

    const setSpirogramZhel = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
        dispatch(patientFormSlice.actions.setSpirogramZhel(Number(value)));
    }, [dispatch]);
    const setSpirogramDo = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
        dispatch(patientFormSlice.actions.setSpirogramDo(Number(value)));
    }, [dispatch]);
    const setSpirogramMod = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
        dispatch(patientFormSlice.actions.setSpirogramMod(Number(value)));
    }, [dispatch]);
    const setSpirogramFzhel = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
        dispatch(patientFormSlice.actions.setSpirogramFzhel(Number(value)));
    }, [dispatch]);
    const setSpirogramOfv1 = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
        dispatch(patientFormSlice.actions.setSpirogramOfv1(Number(value)));
    }, [dispatch]);
    const setSpirogramIt = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
        dispatch(patientFormSlice.actions.setSpirogramIt(Number(value)));
    }, [dispatch]);
    const setSpirogramPos = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
        dispatch(patientFormSlice.actions.setSpirogramPos(Number(value)));
    }, [dispatch]);
    const setSpirogramMos25 = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
        dispatch(patientFormSlice.actions.setSpirogramMos25(Number(value)));
    }, [dispatch]);
    const setSpirogramMos50 = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
        dispatch(patientFormSlice.actions.setSpirogramMos50(Number(value)));
    }, [dispatch]);
    const setSpirogramMos75 = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
        dispatch(patientFormSlice.actions.setSpirogramMos75(Number(value)));
    }, [dispatch]);
    const setSpirogramSos2575 = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
        dispatch(patientFormSlice.actions.setSpirogramSos2575(Number(value)));
    }, [dispatch]);

    const setReport = useCallback(({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
		dispatch(patientFormSlice.actions.setReport(value));
    }, [dispatch]);
    
    const astTestResult = patientData.survey.impactOnWorkFunctions +
    patientData.survey.difficultyBreathing +
    patientData.survey.wakeUpFrequency +
    patientData.survey.inhalerUseFrequency +
    patientData.survey.degreeOfControl;

    let astTestResultConclusion = 'Отсутствие контроля';
    let astTestResultClass = classes.astResultNoControl;
    
    if (astTestResult > 24) {
        astTestResultConclusion = 'Полный котроль';
        astTestResultClass = classes.astResultFullControl;
    }
    
    if (astTestResult <= 24 && astTestResult >= 20) {
        astTestResultConclusion = 'Частичный котроль';
        astTestResultClass = classes.astResultPartialControl;
    }

    const commitmentAssessmentResult = 
    Number(patientData.survey.isForgotToTakeMedicationsForTreatment !== undefined && patientData.survey.isForgotToTakeMedicationsForTreatment === false) +
    Number(patientData.survey.isSometimesInattentiveToTheHoursOfMedications !== undefined && patientData.survey.isSometimesInattentiveToTheHoursOfMedications === false) +
    Number(patientData.survey.isSkipMedicationsIfFeelWell !== undefined && patientData.survey.isSkipMedicationsIfFeelWell === false) +
    Number(patientData.survey.isMissNextMedicationsIfFeelBad !== undefined && patientData.survey.isMissNextMedicationsIfFeelBad === false);

    let commitmentAssessmentResultConclusion = 'не привержен к лечению';
    let commitmentAssessmentResultClass = classes.astResultNoControl;

    if (commitmentAssessmentResult === 4) {
        commitmentAssessmentResultConclusion = 'привержен к лечению';
        commitmentAssessmentResultClass = classes.astResultFullControl;
    }

    if (commitmentAssessmentResult === 3) {
        commitmentAssessmentResultConclusion = 'недостаточно привержен к лечению';
        commitmentAssessmentResultClass = classes.astResultPartialControl;
    }

    const bmi = calculateBMI(patientData.survey.weight, patientData.survey.height);

	return (
    	<Box className={classes.wrapper}>
            <Snackbar open={isSavedSuccess} autoHideDuration={6000} onClose={resetIsSaved}>
                <MuiAlert onClose={resetIsSaved} severity='success'>
                    {'Данные пациента успешно сохранены'}
                </MuiAlert>
            </Snackbar>
            <Snackbar open={isSavedFailure} autoHideDuration={6000} onClose={resetIsSaved}>
                <MuiAlert onClose={resetIsSaved} severity='error'>
                    {'Ошибка: не удалось сохранить данные пациента'}
                </MuiAlert>
            </Snackbar>

            <Button
                className={classes.navigationButton}
                variant='outlined'
                color='primary'
                component={RouterLink}
                to={Routes.Home}>
                { 'Назад' }
            </Button>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'1. Ваши фамилия, имя, отчество'}
                </Box>
                <TextField
                    required
                    id='surname'
                    label='Фамилия'
                    variant='outlined'
                    value={ patientData.surname }
                    onChange={ setSurname }
                    className={classes.formInput}
                />
                <TextField
                    required
                    id='name'
                    label='Имя'
                    variant='outlined'
                    value={ patientData.name }
                    onChange={ setName }
                    className={classes.formInput}
                />
                <TextField
                    required
                    id='patronymic'
                    label='Отчество'
                    variant='outlined'
                    value={ patientData.patronymic }
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
                    value={ patientData.dateOfBirth }
                    onChange={ setDateOfBirth }
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
                        value={  patientData.survey.diagnosisForm }
                        onChange={setDiagnosisForm}
                    >
                        { DiagnosisForms.map(diagnosisForm => (
                           <option value={diagnosisForm.value}>{diagnosisForm.text}</option>
                        )) }
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
                        value={ patientData.survey.diagnosisCourse }
                        onChange={setDiagnosisCourse}
                    >
                        { DiagnosisCourses.map(diagnosisCourse => (
                           <option value={diagnosisCourse.value}>{diagnosisCourse.text}</option>
                        )) }
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
                        value={ patientData.survey.diagnosisDegreeOfControl }
                        onChange={setDiagnosisDegreeOfControl}
                    >
                        { DiagnosisDegreesOfControl.map(degreeOfControl => (
                           <option value={degreeOfControl.value}>{degreeOfControl.text}</option>
                        )) }
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
                        value={ patientData.survey.diagnosisRespiratoryFailure }
                        onChange={setDiagnosisRespiratoryFailure}
                    >
                         { DiagnosisRespiratoryFailures.map(respiratoryFailure => (
                           <option value={respiratoryFailure.value}>{respiratoryFailure.text}</option>
                        )) }
                    </Select>
                </FormControl>
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'4. Укажите стаж заболевания бронхиальной астмой'}
                </Box>
                <TextField
                    id='lengthOfIllness'
                    label='Стаж заболевания'
                    type='number'
                    variant='outlined'
                    value={ patientData.survey.lengthOfIllness || '' }
                    onChange={ setLengthOfIllness }
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'5. Какой метод иммунотерапии использовался при лечении?'}
                </Box>
                <FormControl component='fieldset'>
                    <FormGroup>
                        { ImmunotherapyMethods.map(method => (
                           <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={getUpdateImmunotherapyMethods(method.value)}
                                        checked={patientData.survey.immunotherapyMethods.some(m => m === method.value)}
                                    />
                                }
                                label={ method.text }
                            /> 
                        )) }
                    </FormGroup>
                </FormControl>
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'6. Какую фармакотерапию Вы получаете?'}
                </Box>
                <FormControl component='fieldset'>
                    <FormGroup>
                        { Pharmacotherapy.map(pharmacotherapy => (
                           <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={getUpdatePharmacotherapy(pharmacotherapy.value)}
                                        checked={patientData.survey.pharmacotherapy.some(p => p === pharmacotherapy.value)}
                                    />
                                }
                                label={ pharmacotherapy.text }
                            /> 
                        )) }
                    </FormGroup>
                </FormControl>
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'7. Как Вы оцениваете эффект от лечения аллергенами (аутосывороткой)?'}
                </Box>
                <FormControl variant='outlined' className={classes.formInput}>
                    <Select
                        inputProps={{
                            name: 'form',
                            id: 'effect-of-treatment-with-allergens',
                        }}
                        value={  patientData.survey.effectOfTreatmentWithAllergens }
                        onChange={ setEffectOfTreatmentWithAllergens }
                        
                    > 
                    {
                        EffectOfTreatmentWithAllergensOptions.map(optionItem => (
                            <option value={optionItem.value}>{optionItem.text}</option>
                        ))
                    }
                    </Select>
                </FormControl>
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'8. Как часто за последние 4 недели астма мешала Вам выполнять обычный объём работы в учебном заведении, на работе или дома?'}
                </Box>
                <FormControl variant='outlined' className={classes.formInput}>
                    <Select
                        inputProps={{
                            name: 'form',
                            id: 'impact-on-work-functions',
                        }}
                        value={  patientData.survey.impactOnWorkFunctions }
                        onChange={ setImpactOnWorkFunctions }
                    >
                    {
                        ImpactOnWorkFunctionsOptions.map(optionItem => (
                            <option value={optionItem.value}>{optionItem.text}</option>
                        ))
                    }
                    </Select>
                </FormControl>
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'9. Как часто за последние 4 недели Вы отмечали у себя затруднённое дыхание?'}
                </Box>
                <FormControl variant='outlined' className={classes.formInput}>
                    <Select
                        inputProps={{
                            name: 'form',
                            id: 'difficulty-breathing',
                        }}
                        value={  patientData.survey.difficultyBreathing }
                        onChange={ setDifficultyBreathing }
                    >
                        {
                            DifficultyBreathingOptions.map(optionItem => (
                                <option value={optionItem.value}>{optionItem.text}</option>
                            ))
                        }
                    </Select>
                </FormControl>
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'10. Как часто за последние 4 недели Вы просыпались ночью или раньше, чем обычно, из-за симптомов астмы (свистящего дыхания, кашля, затруднённого дыхания, чувства стеснения в груди или боли в груди)?'}
                </Box>
                <FormControl variant='outlined' className={classes.formInput}>
                    <Select
                        inputProps={{
                            name: 'form',
                            id: 'wake-up-frequency',
                        }}
                        value={  patientData.survey.wakeUpFrequency }
                        onChange={ setWakeUpFrequency }
                    >
                        {
                            WakeUpFrequencyOptions.map(optionItem => (
                                <option value={optionItem.value}>{optionItem.text}</option>
                            ))
                        }
                    </Select>
                </FormControl>
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'11. Как часто за последние 4 недели Вы использовали быстродействующий ингалятор (например, Беротек, Сальбутамол)?'}
                </Box>
                <FormControl variant='outlined' className={classes.formInput}>
                    <Select
                        inputProps={{
                            name: 'form',
                            id: 'inhaler-use-frequency',
                        }}
                        value={  patientData.survey.inhalerUseFrequency }
                        onChange={ setInhalerUseFrequency }
                    >
                        {
                            InhalerUseFrequencyOptions.map(optionItem => (
                                <option value={optionItem.value}>{optionItem.text}</option>
                            ))
                        }
                    </Select>
                </FormControl>
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'12. Как бы Вы оценили, насколько Вам удавалось контролировать астму за последние 4 недели?'}
                </Box>
                <FormControl variant='outlined' className={classes.formInput}>
                    <Select
                        inputProps={{
                            name: 'form',
                            id: 'degree-of-control',
                        }}
                        value={  patientData.survey.degreeOfControl }
                        onChange={ setDegreeOfControl }
                    >
                        {
                            DegreeOfControlOptions.map(optionItem => (
                                <option value={optionItem.value}>{optionItem.text}</option>
                            ))
                        }
                    </Select>
                </FormControl>            
                <Box my={3} display={'flex'} flexDirection={'row'}>
                    {`Результат АСТ-теста: ${astTestResult} баллов `}
                    <Box pl={1} className={astTestResultClass}>{`(${astTestResultConclusion})`}</Box>
                </Box>
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'13. В каком возрасте у Вас была диагностирована бронхиальная астма?'}
                </Box>
                <TextField
                    id='ageWhenWasDiagnosed'
                    label='Возраст в  котором был поставлен диагноз'
                    type='number'
                    variant='outlined'
                    onChange={ setAgeWhenWasDiagnosed }
                    value={ patientData.survey.ageWhenWasDiagnosed || '' }
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'14. У пациента бронхиальная астма с фиксированной обструкцией дыхательных путей?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='is fixed respiratory tract obstruction'
                        name='isFixedRespiratoryTractObstruction'
                        value={ patientData.survey.isFixedRespiratoryTractObstruction }
                        onChange={ setIsFixedRespiratoryTractObstruction }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'15. У пациента бронхиальная астма с поздним началом?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='is late start'
                        name='isLateStart'
                        value={ patientData.survey.isLateStart }
                        onChange={ setIsLateStart }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'16. У пациента тяжёлое течение бронхиальной астмы?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='is hard course'
                        name='isHardCourse'
                        value={ patientData.survey.isHardCourse }
                        onChange={ setIsHardCourse }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'17. Имеется ли у Вас контакт в быту и на производстве с аллергенами и триггерами?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='is there contact with allergens'
                        name='isThereContactWithAllergens'
                        value={ patientData.survey.isThereContactWithAllergens }
                        onChange={ setIsThereContactWithAllergens }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'18. Имеется ли у Вас полисенсибилизация к различным аллергенам?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='polysensitization to allergens'
                        name='isPolysensitizationToAllergens'
                        value={ patientData.survey.isPolysensitizationToAllergens }
                        onChange={ setIsPolysensitizationToAllergens }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'19. Имеется ли у Вас сопутствующая аллергопатология (аллергический ринит, конъюнктивит, пищевая аллергия)?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='allergic pathology'
                        name='isAllergicPathology'
                        value={ patientData.survey.isAllergicPathology }
                        onChange={ setIsAllergicPathology }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'20. Техника ингаляции правильная?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='is correct inhalation technique'
                        name='isCorrectInhalationTechnique'
                        value={ patientData.survey.isCorrectInhalationTechnique }
                        onChange={ setIsCorrectInhalationTechnique }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'21. Имеется ли у Вас сопутствующая хроническая обструктивная болезнь лёгких?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='is chronic obstructive pulmonary disease'
                        name='isChronicObstructivePulmonaryDisease'
                        value={ patientData.survey.isChronicObstructivePulmonaryDisease }
                        onChange={ setIsChronicObstructivePulmonaryDisease }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'22. Соблюдаете ли Вы рекомендованные режим и образ жизни?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='is follow recommended mode'
                        name='isFollowRecommendedMode'
                        value={ patientData.survey.isFollowRecommendedMode }
                        onChange={ setIsFollowRecommendedMode }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'23. Курите ли Вы?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='is smoker'
                        name='isSmoker'
                        value={ patientData.survey.isSmoker }
                        onChange={ setIsSmoker }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'24. Продолжается ли контакт с аллергенами и триггерами?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='is continue contact with allergens'
                        name='isContinueContactWithAllergens'
                        value={ patientData.survey.isContinueContactWithAllergens }
                        onChange={ setIsContinueContactWithAllergens }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'25. Укажите Ваш вес и рост'}
                </Box>
                <TextField
                    id='weight'
                    label='вес (кг)'
                    type='number'
                    variant='outlined'
                    className={classes.formInput}
                    onChange={ setWeight }
                    value={ patientData.survey.weight || '' }
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id='height'
                    label='рост (см)'
                    type='number'
                    variant='outlined'
                    className={classes.formInput}
                    onChange={ setHeight }
                    value={ patientData.survey.height || '' }
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Box>
                    { bmi && `ИМТ: ${bmi.toFixed(2)}`}
                </Box>    
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'26. Проводилось ли раньше лечение аллергенами?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='is allergen treatment before'
                        name='isAllergenTreatmentBefore'
                        value={ patientData.survey.isAllergenTreatmentBefore }
                        onChange={ setIsAllergenTreatmentBefore }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'27. Поздно ли от момента установления диагноза было начато лечение аллергенами?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='is late start treatment with allergens'
                        name='isLateStartTreatmentWithAllergens'
                        value={ patientData.survey.isLateStartTreatmentWithAllergens }
                        onChange={ setIsLateStartTreatmentWithAllergens }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'28. Проводилось ли раньше аутосеротерапия?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='is autoserotherapy performed before'
                        name='isAutoserotherapyPerformedBefore'
                        value={ patientData.survey.isAutoserotherapyPerformedBefore }
                        onChange={ setIsAutoserotherapyPerformedBefore }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'29. Вариабельность пиковой скорости выдоха >20%?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='is variation in peak expiratory flow greater 20'
                        name='isVariationInPeakExpiratoryFlowGreater20'
                        value={ patientData.survey.isVariationInPeakExpiratoryFlowGreater20 }
                        onChange={ setIsVariationInPeakExpiratoryFlowGreater20 }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'30. Наличие у пациента интеркуррентных инфекций верхних дыхательных путей?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='is intercurrent upper respiratory tract infections'
                        name='isIntercurrentUpperRespiratoryTractInfections'
                        value={ patientData.survey.isIntercurrentUpperRespiratoryTractInfections }
                        onChange={ setIsIntercurrentUpperRespiratoryTractInfections }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'31. Наличие у пациента нежелательных побочных эффектов лекарственных средств?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='is undesirable side effects of drugs'
                        name='isUndesirableSideEffectsOfDrugs'
                        value={ patientData.survey.isUndesirableSideEffectsOfDrugs }
                        onChange={ setIsUndesirableSideEffectsOfDrugs }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'32. Не назначались ингаляционные глюкокортикостероиды?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='is not prescribed inhaled glucocorticosteroids'
                        name='isNotPrescribedInhaledGlucocorticosteroids'
                        value={ patientData.survey.isNotPrescribedInhaledGlucocorticosteroids }
                        onChange={ setIsNotPrescribedInhaledGlucocorticosteroids }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'33. Использовались неэффективные дозы ингаляционных глюкокортикостероидов?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='is used ineffective doses of inhaled glucocorticosteroids'
                        name='isUsedIneffectiveDosesOfInhaledGlucocorticosteroids'
                        value={ patientData.survey.isUsedIneffectiveDosesOfInhaledGlucocorticosteroids }
                        onChange={ setIsUsedIneffectiveDosesOfInhaledGlucocorticosteroids }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'34. Вы когда-нибудь забывали принять препараты для лечения?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='is forgot to take medications for treatment'
                        name='isForgotToTakeMedicationsForTreatment'
                        value={ patientData.survey.isForgotToTakeMedicationsForTreatment }
                        onChange={ setIsForgotToTakeMedicationsForTreatment }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'35. Относитесь ли Вы иногда невнимательно к часам приёма?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='is sometimes inattentive to the hours of medications'
                        name='isSometimesInattentiveToTheHoursOfMedications'
                        value={ patientData.survey.isSometimesInattentiveToTheHoursOfMedications }
                        onChange={ setIsSometimesInattentiveToTheHoursOfMedications }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'36. Пропускаете ли Вы приём препаратов, если чувствуете себя хорошо?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='is skip medications if feel well'
                        name='isSkipMedicationsIfFeelWell'
                        value={ patientData.survey.isSkipMedicationsIfFeelWell }
                        onChange={ setIsSkipMedicationsIfFeelWell }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'37. Если Вы чувствуете себя плохо после приёма лекарственного средства, пропускаете ли Вы следующий приём?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup
                        aria-label='is miss next medications if feel bad'
                        name='isMissNextMedicationsIfFeelBad'
                        value={ patientData.survey.isMissNextMedicationsIfFeelBad }
                        onChange={ setIsMissNextMedicationsIfFeelBad }
                    >
                        <FormControlLabel value={'true'} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={'false'} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>
                <Box my={3} display={'flex'} flexDirection={'row'}>
                    {`Результат теста приверженности: ${commitmentAssessmentResult || 0}`}
                    <Box pl={1} className={commitmentAssessmentResultClass}>{`(${commitmentAssessmentResultConclusion})`}</Box>
                </Box>
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'38. Спирограмма:'}
                </Box>
                <Box className={classes.spirogramInputWrapper}>
                    <Box className={classes.spirogramInputLabel}>{'ЖЕЛ'}</Box>
                    <TextField
                        id='zhel'
                        type='number'
                        variant='outlined'
                        className={classes.formInput}
                        value={ patientData.survey.spirogram.zhel || '' }
                        onChange={ setSpirogramZhel }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />    
                </Box>
                <Box className={classes.spirogramInputWrapper}>
                    <Box className={classes.spirogramInputLabel}>{'ДО'}</Box>
                    <TextField
                        id='do'
                        type='number'
                        variant='outlined'
                        className={classes.formInput}
                        value={ patientData.survey.spirogram.do || '' }
                        onChange={ setSpirogramDo }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />    
                </Box>
                <Box className={classes.spirogramInputWrapper}>
                    <Box className={classes.spirogramInputLabel}>{'МОД'}</Box>
                    <TextField
                        id='mod'
                        type='number'
                        variant='outlined'
                        className={classes.formInput}
                        value={ patientData.survey.spirogram.mod || '' }
                        onChange={ setSpirogramMod }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />    
                </Box>
                <Box className={classes.spirogramInputWrapper}>
                    <Box className={classes.spirogramInputLabel}>{'ФЖЕЛ'}</Box>
                    <TextField
                        id='fzhel'
                        type='number'
                        variant='outlined'
                        className={classes.formInput}
                        value={ patientData.survey.spirogram.fzhel || '' }
                        onChange={ setSpirogramFzhel }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />    
                </Box>
                <Box className={classes.spirogramInputWrapper}>
                    <Box className={classes.spirogramInputLabel}>{'ОФВ1'}</Box>
                    <TextField
                        id='ofv1'
                        type='number'
                        variant='outlined'
                        className={classes.formInput}
                        value={ patientData.survey.spirogram.ofv1 || '' }
                        onChange={ setSpirogramOfv1 }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />    
                </Box>
                <Box className={classes.spirogramInputWrapper}>
                    <Box className={classes.spirogramInputLabel}>{'ИТ'}</Box>
                    <TextField
                        id='it'
                        type='number'
                        variant='outlined'
                        className={classes.formInput}
                        value={ patientData.survey.spirogram.it || '' }
                        onChange={ setSpirogramIt }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />    
                </Box>
                <Box className={classes.spirogramInputWrapper}>
                    <Box className={classes.spirogramInputLabel}>{'ПОСвыд'}</Box>
                    <TextField
                        id='pos'
                        type='number'
                        variant='outlined'
                        className={classes.formInput}
                        value={ patientData.survey.spirogram.pos || '' }
                        onChange={ setSpirogramPos }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />    
                </Box>
                <Box className={classes.spirogramInputWrapper}>
                    <Box className={classes.spirogramInputLabel}>{'МОС25'}</Box>
                    <TextField
                        id='mos25'
                        type='number'
                        variant='outlined'
                        className={classes.formInput}
                        value={ patientData.survey.spirogram.mos25 || '' }
                        onChange={ setSpirogramMos25 }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />    
                </Box>
                <Box className={classes.spirogramInputWrapper}>
                    <Box className={classes.spirogramInputLabel}>{'МОС50'}</Box>
                    <TextField
                        id='mos50'
                        type='number'
                        variant='outlined'
                        className={classes.formInput}
                        value={ patientData.survey.spirogram.mos50 || '' }
                        onChange={ setSpirogramMos50 }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />    
                </Box>
                <Box className={classes.spirogramInputWrapper}>
                    <Box className={classes.spirogramInputLabel}>{'МОС75'}</Box>
                    <TextField
                        id='mos75'
                        type='number'
                        variant='outlined'
                        className={classes.formInput}
                        value={ patientData.survey.spirogram.mos75 || '' }
                        onChange={ setSpirogramMos75 }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />    
                </Box>
                <Box className={classes.spirogramInputWrapper}>
                    <Box className={classes.spirogramInputLabel}>{'СОС2575'}</Box>
                    <TextField
                        id='sos2575'
                        type='number'
                        variant='outlined'
                        className={classes.formInput}
                        value={ patientData.survey.spirogram.sos2575 || '' }
                        onChange={ setSpirogramSos2575 }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />    
                </Box>
            </Box>
            <Box pt={5} pb={3} className={classes.questionBlock}>
                <TextField
                    id='report'
                    label='заключение'
                    variant='outlined'
                    multiline
                    rows={5}
                    className={classes.formInput}
                    onChange={ setReport }
                    value={ patientData.survey.report }
                />
            </Box>
            <Box>
                <Button
                    className={classes.actionButton}
                    variant='contained'
                    color='primary'
                    onClick={savePatientFormData}>
                        {'Сохранить'}
                </Button>
                <Button
                    className={classes.actionButton}
                    variant='outlined'
                    color='primary'
                    component={RouterLink}
                    to={Routes.Home}>
                        { 'Отмена' }
                </Button>
            </Box>
        </Box>
	);
};
