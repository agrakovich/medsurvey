import React, { useState, useCallback, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {
	DiagnosisCourses,
	DiagnosisForms,
	DiagnosisDegreesOfControl,
	DiagnosisRespiratoryFailures,
    ImmunotherapyMethods,
    Pharmacotherapy,
    EffectOfTreatmentWithAllergensOptions,
    ImpactOnWorkFunctionsOptions,
    DifficultyBreathingOptions,
    WakeUpFrequencyOptions,
    InhalerUseFrequencyOptions,
    DegreeOfControlOptions,
    AgeOfEarlyDiagnosis,
    CriticalBMI
} from '../../app/constants';
import { calculateBMI } from '../../app/utils';

import type { PatientData } from '../patientForm';

import { InfluencingFactorIcon } from './InfluencingFactorIcon';
import { NotSpecifiedText } from './constants';
import { patientsListSlice } from './patientsListSlice';
import { selectIsDeletedSuccess, selectIsDeletedFailure } from './selectors';

const useStyles = makeStyles(() => ({
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

export const PatientDetailsRow: FunctionComponent<PatientData> = ({ id, name, surname, patronymic, dateOfBirth, dateOfAdding, survey }: PatientData) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const isDeletedSuccess = useSelector(selectIsDeletedSuccess);
    const isDeletedFailure = useSelector(selectIsDeletedFailure);

    const resetIsDeleted = useCallback(() => {
		dispatch(patientsListSlice.actions.resetIsDeleted);
    }, [dispatch]);

    const deletePatient = useCallback((id: string) => {
		dispatch(patientsListSlice.actions.deletePatientRequest(id));
    }, [dispatch]);

    const [open, setOpen] = useState(false);
    const bmi = calculateBMI(survey.weight, survey.height);
    const astTestResult = survey.impactOnWorkFunctions +
        survey.difficultyBreathing +
        survey.wakeUpFrequency +
        survey.inhalerUseFrequency +
        survey.degreeOfControl;

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
    Number(survey.isForgotToTakeMedicationsForTreatment !== undefined && survey.isForgotToTakeMedicationsForTreatment === false) +
    Number(survey.isSometimesInattentiveToTheHoursOfMedications !== undefined && survey.isSometimesInattentiveToTheHoursOfMedications === false) +
    Number(survey.isSkipMedicationsIfFeelWell !== undefined && survey.isSkipMedicationsIfFeelWell === false) +
    Number(survey.isMissNextMedicationsIfFeelBad !== undefined && survey.isMissNextMedicationsIfFeelBad === false);

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

    return (
        <React.Fragment>
            <TableRow>
                <Snackbar open={isDeletedSuccess} autoHideDuration={6000} onClose={resetIsDeleted}>
                    <MuiAlert onClose={resetIsDeleted} severity='success'>
                        {'Данные пациента успешно удалены'}
                    </MuiAlert>
                </Snackbar>
                <Snackbar open={isDeletedFailure} autoHideDuration={6000} onClose={resetIsDeleted}>
                    <MuiAlert onClose={resetIsDeleted} severity='error'>
                        {'Ошибка: не удалось удалить данные пациента'}
                    </MuiAlert>
                </Snackbar>
                <TableCell>
                    <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component='th' scope='row'>{surname}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{patronymic}</TableCell>
                <TableCell>{moment(dateOfBirth).format('DD/MM/YYYY')}</TableCell>
                <TableCell>{moment(dateOfAdding).format('DD/MM/YYYY')}</TableCell>
                <TableCell>
                    <IconButton aria-label='delete user' size='small' onClick={ () => deletePatient(id) }>
                        <DeleteIcon onClick={ () => deletePatient(id) } />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box margin={1}>
                            <Typography variant='h5' gutterBottom component='div'>
                                {'Опрос'}
                            </Typography>
                            <Box margin={3}>
                                <Typography variant='h6' gutterBottom component='div'>
                                    {'Диагноз: Бронхиальная астма (J 45)'}
                                </Typography>
                                <Table size='small' aria-label='diagnosis'>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell width='30%' align='right'>форма</TableCell>
                                            <TableCell>{
                                                survey.diagnosisForm
                                                    ? DiagnosisForms.find(f => f.value === survey.diagnosisForm)?.text
                                                    : 'не указано'
                                            }</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell width='30%' align='right'>течение</TableCell>
                                            <TableCell>{
                                                survey.diagnosisCourse
                                                    ? DiagnosisCourses.find(c => c.value === survey.diagnosisCourse)?.text
                                                    : 'не указано'
                                            }</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell width='30%' align='right'>степень контроля</TableCell>
                                            <TableCell>{
                                                survey.diagnosisDegreeOfControl
                                                    ? DiagnosisDegreesOfControl.find(c => c.value === survey.diagnosisDegreeOfControl)?.text
                                                    : 'не указано'
                                            }</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell width='30%' align='right'>ДН (дыхательная недостаточность)</TableCell>
                                            <TableCell>{
                                                survey.diagnosisRespiratoryFailure
                                                    ? DiagnosisRespiratoryFailures.find(c => c.value === survey.diagnosisRespiratoryFailure)?.text
                                                    : 'не указано'    
                                            }</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <Typography variant='h6' gutterBottom component='div'>
                                    {`Стаж заболевания: ${survey.lengthOfIllness ? survey.lengthOfIllness : ' - '} (лет)`}
                                </Typography>
                                <Box>
                                    <Typography variant='h6' gutterBottom component='div'>
                                        {'Методы иммунотерапии, которые использовался при лечении:'}
                                    </Typography>
                                    <Box paddingLeft={2}>
                                    {
                                        survey.immunotherapyMethods.map(method => (
                                            <Typography variant='subtitle1'>{
                                                ImmunotherapyMethods.find(m => m.value === method)?.text
                                            }</Typography>
                                        ))
                                    }
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography variant='h6' gutterBottom component='div'>
                                        {'Пациент получает фармакотерапию:'}
                                    </Typography>
                                    <Box paddingLeft={2}>
                                    {
                                        survey.pharmacotherapy.map(method => (
                                            <Typography variant='subtitle1'>{
                                                Pharmacotherapy.find(m => m.value === method)?.text
                                            }</Typography>
                                        ))
                                    }
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography variant='h6' gutterBottom component='div'>
                                        {`Пациент оценивает эффект от лечения аллергенами (аутосывороткой): ${EffectOfTreatmentWithAllergensOptions.find(o => o.value === survey.effectOfTreatmentWithAllergens)?.text || ''}`}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant='h6' gutterBottom component='div'>
                                        {'АСТ-тест'}
                                    </Typography>
                                    <Table size='small' aria-label='ast test'>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell width='70%'>{'Как часто за последние 4 недели астма мешала Вам выполнять обычный объём работы в учебном заведении, на работе или дома?'}</TableCell>
                                                <TableCell>{
                                                    survey.impactOnWorkFunctions
                                                        ? ImpactOnWorkFunctionsOptions.find(f => f.value === survey.impactOnWorkFunctions)?.text
                                                        : 'не указано'
                                                }</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Как часто за последние 4 недели Вы отмечали у себя затруднённое дыхание?'}</TableCell>
                                                <TableCell>{
                                                    survey.difficultyBreathing
                                                        ? DifficultyBreathingOptions.find(f => f.value === survey.difficultyBreathing)?.text
                                                        : 'не указано'
                                                }</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Как часто за последние 4 недели Вы просыпались ночью или раньше, чем обычно, из-за симптомов астмы (свистящего дыхания, кашля, затруднённого дыхания, чувства стеснения в груди или боли в груди)?'}</TableCell>
                                                <TableCell>{
                                                    survey.wakeUpFrequency
                                                        ? WakeUpFrequencyOptions.find(f => f.value === survey.wakeUpFrequency)?.text
                                                        : 'не указано'
                                                }</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Как часто за последние 4 недели Вы использовали быстродействующий ингалятор (например, Беротек, Сальбутамол)?'}</TableCell>
                                                <TableCell>{
                                                    survey.inhalerUseFrequency
                                                        ? InhalerUseFrequencyOptions.find(f => f.value === survey.inhalerUseFrequency)?.text
                                                        : 'не указано'
                                                }</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Как бы Вы оценили, насколько Вам удавалось контролировать астму за последние 4 недели?'}</TableCell>
                                                <TableCell>{
                                                    survey.degreeOfControl
                                                        ? DegreeOfControlOptions.find(f => f.value === survey.degreeOfControl)?.text
                                                        : 'не указано'
                                                }</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={2}>{
                                                    <Box my={3} display={'flex'} flexDirection={'row'}>
                                                        {`Результат АСТ-теста: ${astTestResult} баллов `}
                                                        <Box  pl={1} className={astTestResultClass}>{`(${astTestResultConclusion || 0})`}</Box>
                                                    </Box>
                                                }</TableCell>
                                            </TableRow>  
                                        </TableBody>
                                    </Table>
                                </Box>
                                <Box>
                                    <Typography variant='h6' gutterBottom component='div'>
                                        {'Модифицируемые факторы'}
                                    </Typography>
                                    <Table size='small' aria-label='influencing-factors'>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell width='70%'>{'В каком возрасте у Вас была диагностирована бронхиальная астма?'}</TableCell>
                                                <TableCell>
                                                    { survey.ageWhenWasDiagnosed ? survey.ageWhenWasDiagnosed : NotSpecifiedText }
                                                </TableCell>
                                                <TableCell>
                                                    <InfluencingFactorIcon condition={ survey.ageWhenWasDiagnosed >= AgeOfEarlyDiagnosis } />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'У пациента бронхиальная астма с фиксированной обструкцией дыхательных путей?'}</TableCell>
                                                <TableCell>
                                                    { survey.isFixedRespiratoryTractObstruction ? 'Да' : 'Нет' }
                                                </TableCell>
                                                <TableCell>
                                                    { survey.isFixedRespiratoryTractObstruction !== undefined &&
                                                        <InfluencingFactorIcon condition={ survey.isFixedRespiratoryTractObstruction === true } />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'У пациента бронхиальная астма с поздним началом?'}</TableCell>
                                                <TableCell>
                                                    { survey.isLateStart ? 'Да' : 'Нет' }
                                                </TableCell>
                                                <TableCell>
                                                    { survey.isLateStart !== undefined &&
                                                        <InfluencingFactorIcon condition={ survey.isLateStart === true } />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'У пациента тяжёлое течение бронхиальной астмы?'}</TableCell>
                                                <TableCell>
                                                    { survey.isHardCourse ? 'Да' : 'Нет' }
                                                </TableCell>
                                                <TableCell>
                                                    { survey.isHardCourse !== undefined &&
                                                        <InfluencingFactorIcon condition={ survey.isHardCourse === true } />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Имеется ли у Вас контакт в быту и на производстве с аллергенами и триггерами?'}</TableCell>
                                                <TableCell>
                                                    { survey.isThereContactWithAllergens ? 'Да' : 'Нет' }
                                                </TableCell>
                                                <TableCell>
                                                    { survey.isThereContactWithAllergens !== undefined &&
                                                        <InfluencingFactorIcon condition={ survey.isThereContactWithAllergens === true } />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Имеется ли у Вас полисенсибилизация к различным аллергенам?'}</TableCell>
                                                <TableCell>
                                                    { survey.isPolysensitizationToAllergens ? 'Да' : 'Нет' }
                                                </TableCell>
                                                <TableCell>
                                                    { survey.isPolysensitizationToAllergens !== undefined &&
                                                        <InfluencingFactorIcon condition={ survey.isPolysensitizationToAllergens === true } />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Имеется ли у Вас сопутствующая аллергопатология (аллергический ринит, конъюнктивит, пищевая аллергия)?'}</TableCell>
                                                <TableCell>
                                                    { survey.isAllergicPathology ? 'Да' : 'Нет' }
                                                </TableCell>
                                                <TableCell>
                                                    { survey.isAllergicPathology !== undefined &&
                                                        <InfluencingFactorIcon condition={ survey.isAllergicPathology === true } />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Техника ингаляции правильная?'}</TableCell>
                                                <TableCell>
                                                    { survey.isCorrectInhalationTechnique ? 'Да' : 'Нет' }
                                                </TableCell>
                                                <TableCell>
                                                    { survey.isCorrectInhalationTechnique !== undefined &&
                                                        <InfluencingFactorIcon condition={ survey.isCorrectInhalationTechnique === false } />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Имеется ли у Вас сопутствующая хроническая обструктивная болезнь лёгких?'}</TableCell>
                                                <TableCell>
                                                    { survey.isChronicObstructivePulmonaryDisease ? 'Да' : 'Нет' }
                                                </TableCell>
                                                <TableCell>
                                                    { survey.isChronicObstructivePulmonaryDisease !== undefined &&
                                                        <InfluencingFactorIcon condition={ survey.isChronicObstructivePulmonaryDisease === true } />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Соблюдаете ли Вы рекомендованные режим и образ жизни?'}</TableCell>
                                                <TableCell>
                                                    { survey.isFollowRecommendedMode ? 'Да' : 'Нет' }
                                                </TableCell>
                                                <TableCell>
                                                    { survey.isFollowRecommendedMode !== undefined &&
                                                        <InfluencingFactorIcon condition={ survey.isFollowRecommendedMode === false } />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Курите ли Вы?'}</TableCell>
                                                <TableCell>
                                                    { survey.isSmoker ? 'Да' : 'Нет' }
                                                </TableCell>
                                                <TableCell>
                                                    { survey.isSmoker !== undefined &&
                                                        <InfluencingFactorIcon condition={ survey.isSmoker === true } />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Продолжается ли контакт с аллергенами и триггерами?'}</TableCell>
                                                <TableCell>
                                                    { survey.isContinueContactWithAllergens ? 'Да' : 'Нет' }
                                                </TableCell>
                                                <TableCell>
                                                    { survey.isContinueContactWithAllergens !== undefined &&
                                                        <InfluencingFactorIcon condition={ survey.isContinueContactWithAllergens === true } />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Продолжается ли контакт с аллергенами и триггерами?'}</TableCell>
                                                <TableCell>
                                                    { survey.isContinueContactWithAllergens ? 'Да' : 'Нет' }
                                                </TableCell>
                                                <TableCell>
                                                    { survey.isContinueContactWithAllergens !== undefined &&
                                                        <InfluencingFactorIcon condition={ survey.isContinueContactWithAllergens === true } />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{`вес: ${survey.weight}, рост: ${survey.height}`}</TableCell>
                                                <TableCell>
                                                    { bmi && `ИМТ: ${bmi.toFixed(2)}` }
                                                </TableCell>
                                                <TableCell>
                                                    { bmi !== undefined &&
                                                        <InfluencingFactorIcon condition={ bmi >= CriticalBMI } />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Проводилось ли раньше лечение аллергенами?'}</TableCell>
                                                <TableCell>
                                                    { survey.isAllergenTreatmentBefore ? 'Да' : 'Нет' }
                                                </TableCell>
                                                <TableCell>
                                                    { survey.isAllergenTreatmentBefore !== undefined &&
                                                        <InfluencingFactorIcon condition={ survey.isAllergenTreatmentBefore === false } />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Поздно ли от момента установления диагноза было начато лечение аллергенами?'}</TableCell>
                                                <TableCell>
                                                    { survey.isLateStartTreatmentWithAllergens ? 'Да' : 'Нет' }
                                                </TableCell>
                                                <TableCell>
                                                    { survey.isLateStartTreatmentWithAllergens !== undefined &&
                                                        <InfluencingFactorIcon condition={ survey.isLateStartTreatmentWithAllergens === true } />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Проводилось ли раньше аутосеротерапия?'}</TableCell>
                                                <TableCell>
                                                    { survey.isAutoserotherapyPerformedBefore ? 'Да' : 'Нет' }
                                                </TableCell>
                                                <TableCell>
                                                    { survey.isAutoserotherapyPerformedBefore !== undefined &&
                                                        <InfluencingFactorIcon condition={ survey.isAutoserotherapyPerformedBefore === false } />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Вариабельность пиковой скорости выдоха >20%?'}</TableCell>
                                                <TableCell>
                                                    { survey.isVariationInPeakExpiratoryFlowGreater20 ? 'Да' : 'Нет' }
                                                </TableCell>
                                                <TableCell>
                                                    { survey.isVariationInPeakExpiratoryFlowGreater20 !== undefined &&
                                                        <InfluencingFactorIcon condition={ survey.isVariationInPeakExpiratoryFlowGreater20 === true } />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Наличие у пациента интеркуррентных инфекций верхних дыхательных путей?'}</TableCell>
                                                <TableCell>
                                                    { survey.isIntercurrentUpperRespiratoryTractInfections ? 'Да' : 'Нет' }
                                                </TableCell>
                                                <TableCell>
                                                    { survey.isIntercurrentUpperRespiratoryTractInfections !== undefined &&
                                                        <InfluencingFactorIcon condition={ survey.isIntercurrentUpperRespiratoryTractInfections === true } />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Наличие у пациента нежелательных побочных эффектов лекарственных средств?'}</TableCell>
                                                <TableCell>
                                                    { survey.isUndesirableSideEffectsOfDrugs ? 'Да' : 'Нет' }
                                                </TableCell>
                                                <TableCell>
                                                    { survey.isUndesirableSideEffectsOfDrugs !== undefined &&
                                                        <InfluencingFactorIcon condition={ survey.isUndesirableSideEffectsOfDrugs === true } />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Не назначались ингаляционные глюкокортикостероиды?'}</TableCell>
                                                <TableCell>
                                                    { survey.isNotPrescribedInhaledGlucocorticosteroids ? 'Да' : 'Нет' }
                                                </TableCell>
                                                <TableCell>
                                                    { survey.isNotPrescribedInhaledGlucocorticosteroids !== undefined &&
                                                        <InfluencingFactorIcon condition={ survey.isNotPrescribedInhaledGlucocorticosteroids === true } />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Использовались неэффективные дозы ингаляционных глюкокортикостероидов?'}</TableCell>
                                                <TableCell>
                                                    { survey.isUsedIneffectiveDosesOfInhaledGlucocorticosteroids ? 'Да' : 'Нет' }
                                                </TableCell>
                                                <TableCell>
                                                    { survey.isUsedIneffectiveDosesOfInhaledGlucocorticosteroids !== undefined &&
                                                        <InfluencingFactorIcon condition={ survey.isUsedIneffectiveDosesOfInhaledGlucocorticosteroids === true } />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                                <Box>
                                    <Typography variant='h6' gutterBottom component='div'>
                                        {'Оценка приверженности'}
                                    </Typography>
                                    <Table size='small' aria-label='commitment assesment'>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell width='70%'>{'Вы когда-нибудь забывали принять препараты для лечения?'}</TableCell>
                                                <TableCell>{
                                                    survey.isForgotToTakeMedicationsForTreatment ? 'Да' : 'Нет'
                                                }</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Относитесь ли Вы иногда невнимательно к часам приёма?'}</TableCell>
                                                <TableCell>{
                                                    survey.isSometimesInattentiveToTheHoursOfMedications ? 'Да' : 'Нет'
                                                }</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Пропускаете ли Вы приём препаратов, если чувствуете себя хорошо?'}</TableCell>
                                                <TableCell>{
                                                    survey.isSkipMedicationsIfFeelWell ? 'Да' : 'Нет'
                                                }</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width='70%'>{'Если Вы чувствуете себя плохо после приёма лекарственного средства, пропускаете ли Вы следующий приём?'}</TableCell>
                                                <TableCell>{
                                                    survey.isMissNextMedicationsIfFeelBad ? 'Да' : 'Нет'
                                                }</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={2}>
                                                    <Box my={3} display={'flex'} flexDirection={'row'}>
                                                        {`Результат теста приверженности: ${commitmentAssessmentResult || 0}`}
                                                        <Box pl={1} className={commitmentAssessmentResultClass}>{`(${commitmentAssessmentResultConclusion})`}</Box>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>  
                                        </TableBody>
                                    </Table>
                                </Box>
                                <Box>
                                    <Typography variant='h6' gutterBottom component='div'>
                                        {'Спирограмма'}
                                    </Typography>
                                    <Table size='small' aria-label='spirogram'>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell width='12%' align={"right"}>ЖЕЛ</TableCell>
                                                <TableCell>{survey.spirogram.zhel || 'не указано'}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"right"}>ДО</TableCell>
                                                <TableCell>{survey.spirogram.do || 'не указано'}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"right"}>МОД</TableCell>
                                                <TableCell>{survey.spirogram.mod || 'не указано'}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"right"}>ФЖЕЛ</TableCell>
                                                <TableCell>{survey.spirogram.fzhel || 'не указано'}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"right"}>ОФВ1</TableCell>
                                                <TableCell>{survey.spirogram.ofv1 || 'не указано'}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"right"}>ИТ</TableCell>
                                                <TableCell>{survey.spirogram.it || 'не указано'}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"right"}>ПОСвыд</TableCell>
                                                <TableCell>{survey.spirogram.pos || 'не указано'}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"right"}>МОС25</TableCell>
                                                <TableCell>{survey.spirogram.mos25 || 'не указано'}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"right"}>МОС50</TableCell>
                                                <TableCell>{survey.spirogram.mos50 || 'не указано'}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"right"}>МОС75</TableCell>
                                                <TableCell>{survey.spirogram.mos75 || 'не указано'}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"right"}>СОС2575</TableCell>
                                                <TableCell>{survey.spirogram.sos2575 || 'не указано'}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                                <Box>
                                    <Typography variant='h6' gutterBottom component='div'>
                                        {'Заключение'}
                                    </Typography>
                                    <Box paddingLeft={2}>
                                        <Typography variant='subtitle1' gutterBottom component='div'>
                                            {survey.report}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
