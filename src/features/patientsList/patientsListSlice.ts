import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ACTIONS_PREFIX } from './constants';

export interface PatientListState {
    isDeletedSuccess: boolean,
    isDeletedFailure: boolean
};

const initialState: PatientListState = {
	isDeletedSuccess: false,
    isDeletedFailure: false
};

export const patientsListSlice = createSlice({
	name: `${ACTIONS_PREFIX}`,
	initialState,
	reducers: {
        resetIsDeleted: (state: PatientListState) => {
			state.isDeletedSuccess = false;
            state.isDeletedFailure = false;
        },
        deletePatientRequest: (state: PatientListState, _: PayloadAction<string>) => {
            state.isDeletedSuccess = false;
            state.isDeletedFailure = false;
        },
        deletePatientSuccess: (state: PatientListState) => {
            state.isDeletedSuccess = true;
        },
        deletePatientFailure: (state: PatientListState) => {
            state.isDeletedFailure = true;
		}
	}
});
