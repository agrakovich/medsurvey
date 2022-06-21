import { takeEvery } from 'redux-saga/effects';

import { patientFormViewSlice } from '../patientFormViewSlice';

import { savePatientFormDataSaga } from './savePatientFormDataSaga';

export function* rootPatientFormSaga() {
	yield takeEvery(patientFormViewSlice.actions.savePatientFormDataRequest.type, savePatientFormDataSaga);
}
