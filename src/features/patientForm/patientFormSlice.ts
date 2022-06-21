import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { PatientData } from './PatientData';
import { ACTIONS_PREFIX } from './constants';

export type PatientFormState = PatientData;

const initialState: PatientFormState = {
    id: '',
	name: '',
    surname: '',
    patronymic: '',
    dateOfBirth: '',
    dateOfAdding: '',
    survey: {
        diagnosisForm: undefined,
        diagnosisCourse: undefined,
        diagnosisRespiratoryFailure: undefined,
        diagnosisDegreeOfControl: undefined,
        lengthOfIllness: undefined,
        immunotherapyMethods: [],
        pharmacotherapy: [],
        effectOfTreatmentWithAllergens: 0,
        impactOnWorkFunctions: 0,
        difficultyBreathing: 0,
        wakeUpFrequency: 0,
        inhalerUseFrequency: 0,
        degreeOfControl: 0,
        ageWhenWasDiagnosed: 0,
        isFixedRespiratoryTractObstruction: undefined,
        isLateStart: undefined,
        isHardCourse: undefined,
        isThereContactWithAllergens: undefined,
        isPolysensitizationToAllergens: undefined,
        isAllergicPathology: undefined,
        isCorrectInhalationTechnique: undefined,
        isChronicObstructivePulmonaryDisease: undefined,
        isFollowRecommendedMode: undefined,
        isSmoker: undefined,
        isContinueContactWithAllergens: undefined,
        weight: undefined,
        height: undefined,
        isAllergenTreatmentBefore: undefined,
        isLateStartTreatmentWithAllergens: undefined,
        isAutoserotherapyPerformedBefore: undefined,
        isVariationInPeakExpiratoryFlowGreater20: undefined,
        isIntercurrentUpperRespiratoryTractInfections: undefined,
        isUndesirableSideEffectsOfDrugs: undefined,
        isNotPrescribedInhaledGlucocorticosteroids: undefined,
        isUsedIneffectiveDosesOfInhaledGlucocorticosteroids: undefined,
        isForgotToTakeMedicationsForTreatment: undefined,
        isSometimesInattentiveToTheHoursOfMedications: undefined,
        isSkipMedicationsIfFeelWell: undefined,
        isMissNextMedicationsIfFeelBad: undefined,
        spirogram: {
            zhel: undefined,
            do: undefined,
            mod: undefined,
            fzhel: undefined,
            ofv1: undefined,
            it: undefined,
            pos: undefined,
            mos25: undefined,
            mos50: undefined,
            mos75: undefined,
            sos2575: undefined
        },
        report: ''
    }
};

export const patientFormSlice = createSlice({
	name: `${ACTIONS_PREFIX}`,
	initialState,
	reducers: {
		setName: (state: PatientFormState, { payload }: PayloadAction<string>) => {
			state.name = payload;
        },
        setSurName: (state: PatientFormState, { payload }: PayloadAction<string>) => {
			state.surname = payload;
        },
        setPatronymic: (state: PatientFormState, { payload }: PayloadAction<string>) => {
			state.patronymic = payload;
        },
        setDateOfBirth: (state: PatientFormState, { payload }: PayloadAction<string>) => {
			state.dateOfBirth = payload;
        },
        setDiagnosisForm: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.diagnosisForm = payload;
        },
        setDiagnosisCourse: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.diagnosisCourse = payload;
        },
        setDiagnosisRespiratoryFailure: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.diagnosisRespiratoryFailure = payload;
        },
        setDiagnosisDegreeOfControl: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.diagnosisDegreeOfControl = payload;
        },
        setLengthOfIllness: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.lengthOfIllness = payload;
        },

        checkImmunotherapyMethod: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			if (!state.survey.immunotherapyMethods.some(m => m === payload)) {
                state.survey.immunotherapyMethods = [payload, ...state.survey.immunotherapyMethods];
            }
        },
        uncheckImmunotherapyMethod: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			if (state.survey.immunotherapyMethods.some(m => m === payload)) {
                state.survey.immunotherapyMethods = [...state.survey.immunotherapyMethods.filter(m => m !== payload)];
            }
        },

        checkPharmacotherapy: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			if (!state.survey.pharmacotherapy.some(m => m === payload)) {
                state.survey.pharmacotherapy = [payload, ...state.survey.pharmacotherapy];
            }
        },
        uncheckPharmacotherapy: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			if (state.survey.pharmacotherapy.some(m => m === payload)) {
                state.survey.pharmacotherapy = [...state.survey.pharmacotherapy.filter(m => m !== payload)];
            }
        },

        setEffectOfTreatmentWithAllergens: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.effectOfTreatmentWithAllergens = payload;
        },

        setImpactOnWorkFunctions: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.impactOnWorkFunctions = payload;
        },

        setDifficultyBreathing: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.difficultyBreathing = payload;
        },

        setWakeUpFrequency: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.wakeUpFrequency = payload;
        },

        setInhalerUseFrequency: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.inhalerUseFrequency = payload;
        },
        
        setDegreeOfControl: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.degreeOfControl = payload;
        },

        setAgeWhenWasDiagnosed: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.ageWhenWasDiagnosed = payload;
        },

        setIsFixedRespiratoryTractObstruction: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isFixedRespiratoryTractObstruction = payload;
        },

        setIsLateStart: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isLateStart = payload;
        },

        setIsHardCourse: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isHardCourse = payload;
        },

        setIsThereContactWithAllergens: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isThereContactWithAllergens = payload;
        },

        setIsPolysensitizationToAllergens: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isPolysensitizationToAllergens = payload;
        },

        setIsAllergicPathology: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isAllergicPathology = payload;
        },

        setIsCorrectInhalationTechnique: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isCorrectInhalationTechnique = payload;
        },

        setIsChronicObstructivePulmonaryDisease: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isChronicObstructivePulmonaryDisease = payload;
        },

        setIsFollowRecommendedMode: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isFollowRecommendedMode = payload;
        },

        setIsSmoker: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isSmoker = payload;
        },

        setIsContinueContactWithAllergens: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isContinueContactWithAllergens = payload;
        },

        setWeight: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.weight = payload;
        },

        setHeight: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.height = payload;
        },

        setIsAllergenTreatmentBefore: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isAllergenTreatmentBefore = payload;
        },

        setIsLateStartTreatmentWithAllergens: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isLateStartTreatmentWithAllergens = payload;
        },

        setIsAutoserotherapyPerformedBefore: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isAutoserotherapyPerformedBefore = payload;
        },

        setIsVariationInPeakExpiratoryFlowGreater20: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isVariationInPeakExpiratoryFlowGreater20 = payload;
        },

        setIsIntercurrentUpperRespiratoryTractInfections: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isIntercurrentUpperRespiratoryTractInfections = payload;
        },

        setIsUndesirableSideEffectsOfDrugs: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isUndesirableSideEffectsOfDrugs = payload;
        },

        setIsNotPrescribedInhaledGlucocorticosteroids: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isNotPrescribedInhaledGlucocorticosteroids = payload;
        },

        setIsUsedIneffectiveDosesOfInhaledGlucocorticosteroids: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isUsedIneffectiveDosesOfInhaledGlucocorticosteroids = payload;
        },

        setIsForgotToTakeMedicationsForTreatment: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isForgotToTakeMedicationsForTreatment = payload;
        },

        setIsSometimesInattentiveToTheHoursOfMedications: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isSometimesInattentiveToTheHoursOfMedications = payload;
        },

        setIsSkipMedicationsIfFeelWell: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isSkipMedicationsIfFeelWell = payload;
        },

        setIsMissNextMedicationsIfFeelBad: (state: PatientFormState, { payload }: PayloadAction<boolean | undefined>) => {
			state.survey.isMissNextMedicationsIfFeelBad = payload;
        },

        setSpirogramZhel: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.spirogram.zhel = payload;
        },
        setSpirogramDo: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.spirogram.do = payload;
        },
        setSpirogramMod: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.spirogram.mod = payload;
        },
        setSpirogramFzhel: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.spirogram.fzhel = payload;
        },
        setSpirogramOfv1: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.spirogram.ofv1 = payload;
        },
        setSpirogramIt: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.spirogram.it = payload;
        },
        setSpirogramPos: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.spirogram.pos = payload;
        },
        setSpirogramMos25: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.spirogram.mos25 = payload;
        },
        setSpirogramMos50: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.spirogram.mos50 = payload;
        },
        setSpirogramMos75: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.spirogram.mos75 = payload;
        },
        setSpirogramSos2575: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.survey.spirogram.sos2575 = payload;
        },

        setReport: (state: PatientFormState, { payload }: PayloadAction<string>) => {
			state.survey.report = payload;
        },
	}
});
