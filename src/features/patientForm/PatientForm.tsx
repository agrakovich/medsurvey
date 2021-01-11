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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import Select from '@material-ui/core/Select';

import { Routes } from '../../Routes';

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

import {
    EffectOfTreatmentWithAllergensOptions,
    ImpactOnWorkFunctionsOptions,
    DifficultyBreathingOptions,
    WakeUpFrequencyOptions,
    InhalerUseFrequencyOptions,
    DegreeOfControlOptions
} from './constants';

const useStyles = makeStyles((theme: Theme) => ({
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
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'4. Укажите стаж заболевания бронхиальной астмой'}
                </Box>
                <TextField
                    id='lengthOfIllness'
                    label='Стаж заболевания'
                    type='number'
                    variant='outlined'
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
                        <FormControlLabel
                            control={<Checkbox />}
                            label='Внутрикожная аллергенспецифическая иммунотерапия'
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label='Сублингвальная аллергенспецифическая иммунотерапия'
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label='Аутосеротерапия'
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label='иммуномодуляторы'
                        />
                    </FormGroup>
                </FormControl>
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'6. Какую фармакотерапию Вы получаете?'}
                </Box>
                <FormControl component='fieldset'>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox />}
                            label='β2-агонисты короткого действия'
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label='Ингаляционные глюкокортикостероиды'
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label='β2-агонисты длительного действия и ингаляционные глюкокортикостероиды в режиме единого ингалятора'
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label='Антилейкотриеновае препараты'
                        />
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
                    >
                        {
                            DegreeOfControlOptions.map(optionItem => (
                                <option value={optionItem.value}>{optionItem.text}</option>
                            ))
                        }
                    </Select>
                </FormControl>            
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
                    <RadioGroup aria-label='is fixed respiratory tract obstruction' name='isFixedRespiratoryTractObstruction'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'15. У пациента бронхиальная астма с поздним началом?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='is late start' name='isLateStart'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'16. У пациента тяжёлое течение бронхиальной астмы?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='is hard course' name='isHardCourse'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'17. Имеется ли у Вас контакт в быту и на производстве с аллергенами и триггерами?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='is there contact with allergens' name='isThereContactWithAllergens'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'18. Имеется ли у Вас полисенсибилизация к различным аллергенам?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='polysensitization to allergens' name='isPolysensitizationToAllergens'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'19. Имеется ли у Вас сопутствующая аллергопатология (аллергический ринит, конъюнктивит, пищевая аллергия)?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='allergic pathology' name='isAllergicPathology'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'20. Техника ингаляции правильная?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='is correct inhalation technique' name='isCorrectInhalationTechnique'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'21. Имеется ли у Вас сопутствующая хроническая обструктивная болезнь лёгких?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='is chronic obstructive pulmonary disease' name='isChronicOstructivePulmonaryDisease'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'22. Соблюдаете ли Вы рекомендованные режим и образ жизни?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='is follow recommended mode' name='isFollowRecommendedMode'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'23. Курите ли Вы?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='is smoker' name='isSmoker'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'24. Продолжается ли контакт с аллергенами и триггерами?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='is continue contact with allergens' name='isContinueContactWithAllergens'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
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
                    InputLabelProps={{
                        shrink: true,
                    }}
                />         
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'26. Проводилось ли раньше лечение аллергенами?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='is allergen treatment before' name='isAllergenTreatmentBefore'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'27. Поздно ли от момента установления диагноза было начато лечение аллергенами?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='is late start treatment with allergens' name='isLateStartTreatmentWithAllergens'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'28. Проводилось ли раньше аутосеротерапия?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='is autoserotherapy performed before' name='isAutoserotherapyPerformedBefore'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'29. Вариабельность пиковой скорости выдоха >20%?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='is variation in peak expiratory flow greater 20' name='isVariationInPeakExpiratoryFlowGreater20'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'30. Наличие у пациента интеркуррентных инфекций верхних дыхательных путей?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='is intercurrent upper respiratory tract infections' name='isIntercurrentUpperRespiratoryTractInfections'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'31. Наличие у пациента нежелательных побочных эффектов лекарственных средств?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='is undesirable side effects of drugs' name='isUndesirableSideEffectsOfDrugs'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'32. Не назначались ингаляционные глюкокортикостероиды?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='is not prescribed inhaled glucocorticosteroids' name='isNotPrescribedInhaledGlucocorticosteroids'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'33. Использовались неэффективные дозы ингаляционных глюкокортикостероидов?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='is used ineffective doses of inhaled glucocorticosteroids' name='isUsedIneffectiveDosesOfInhaledGlucocorticosteroids'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'34. Вы когда-нибудь забывали принять препараты для лечения?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='is forgot to take medications for treatment' name='isForgotToTakeMedicationsForTreatment'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'35. Не относитесь ли Вы иногда невнимательно к часам приёма?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='is sometimes inattentive to the hours of medications' name='isSometimesInattentiveToTheHoursOfMedications'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'36. Не пропускаете ли Вы приём препаратов, если чувствуете себя хорошо?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='is skip medications if feel well' name='isSkipMedicationsIfFeelWell'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
            </Box>
            <Box className={classes.questionBlock}>
                <Box className={classes.questionText}>
                    {'37. Если Вы чувствуете себя плохо после приёма лекарственного средства, не пропускаете ли Вы следующий приём?'}
                </Box>
                <FormControl component='fieldset'>
                    <RadioGroup aria-label='is miss next medications if feel bad' name='isMissNextMedicationsIfFeelBad'>
                        <FormControlLabel value={true} control={<Radio />} label={'Да'} />
                        <FormControlLabel value={false} control={<Radio />} label={'Нет'} />
                    </RadioGroup>
                </FormControl>            
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
