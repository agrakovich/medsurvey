import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ACTIONS_PREFIX } from './constants';

interface PatientFormState {
    name: string,
    surname: string,
    patronymic: string,
    dateOfBirth: string,
    diagnosisForm?: number,
    diagnosisCourse?: number,
    diagnosisRespiratoryFailure?: number,
    diagnosisDegreeOfControl?: number,
    lengthOfIllness?: number
}

const initialState: PatientFormState = {
	name: '',
    surname: '',
    patronymic: '',
    dateOfBirth: '',
    diagnosisForm: undefined,
    diagnosisCourse: undefined,
    diagnosisRespiratoryFailure: undefined,
    diagnosisDegreeOfControl: undefined,
    lengthOfIllness: undefined
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
			state.diagnosisForm = payload;
        },
        setDiagnosisCourse: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.diagnosisCourse = payload;
        },
        setDiagnosisRespiratoryFailure: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.diagnosisRespiratoryFailure = payload;
        },
        setDiagnosisDegreeOfControl: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.diagnosisDegreeOfControl = payload;
        },
        setLengthOfIllness: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.lengthOfIllness = payload;
		}
	}
});
