import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ACTIONS_PREFIX } from './constants';

interface PatientFormState {
    name: string,
    surname: string,
    patronymic: string,
    dateOfBirth?: Date,
    diagnosisForm: string,
    diagnosisCourse: string,
    diagnosisRespiratoryFailure: string,
    lengthOfIllness?: number
}

const initialState: PatientFormState = {
	name: '',
    surname: '',
    patronymic: '',
    dateOfBirth: undefined,
    diagnosisForm: '',
    diagnosisCourse: '',
    diagnosisRespiratoryFailure: '',
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
        setDateOfBirth: (state: PatientFormState, { payload }: PayloadAction<Date>) => {
			state.dateOfBirth = payload;
        },
        setDiagnosisForm: (state: PatientFormState, { payload }: PayloadAction<string>) => {
			state.diagnosisForm = payload;
        },
        setDiagnosisCourse: (state: PatientFormState, { payload }: PayloadAction<string>) => {
			state.diagnosisCourse = payload;
        },
        setDiagnosisRespiratoryFailure: (state: PatientFormState, { payload }: PayloadAction<string>) => {
			state.diagnosisRespiratoryFailure = payload;
        },
        setLengthOfIllness: (state: PatientFormState, { payload }: PayloadAction<number>) => {
			state.lengthOfIllness = payload;
		}
	}
});
