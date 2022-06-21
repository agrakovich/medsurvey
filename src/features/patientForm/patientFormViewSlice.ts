import { createSlice } from '@reduxjs/toolkit';

import { ACTIONS_PREFIX } from './constants';

export interface PatientFormViewState {
    isSavedSuccess: boolean,
    isSavedFailure: boolean
};

const initialState: PatientFormViewState = {
	isSavedSuccess: false,
    isSavedFailure: false
};

export const patientFormViewSlice = createSlice({
	name: `${ACTIONS_PREFIX}`,
	initialState,
	reducers: {
        resetIsSaved: (state: PatientFormViewState) => {
			state.isSavedSuccess = false;
            state.isSavedFailure = false;
        },
        savePatientFormDataRequest: (state: PatientFormViewState) => {
            state.isSavedSuccess = false;
            state.isSavedFailure = false;
        },
        savePatientFormDataSuccess: (state: PatientFormViewState) => {
            state.isSavedSuccess = true;
        },
        savePatientFormDataFailure: (state: PatientFormViewState) => {
            state.isSavedFailure = true;
		}
	}
});
