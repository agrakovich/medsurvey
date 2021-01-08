import { takeEvery } from 'redux-saga/effects';

import { patientFormSlice } from '../patientFormSlice';

import { savePatientFormDataSaga } from './savePatientFormDataSaga';

export function* rootPatientFormSaga() {
	yield takeEvery(patientFormSlice.actions.savePatientFormDataRequest.type, savePatientFormDataSaga);
}
