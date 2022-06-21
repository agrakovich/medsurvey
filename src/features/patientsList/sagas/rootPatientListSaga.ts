import { takeEvery } from 'redux-saga/effects';

import { patientsListSlice } from '../patientsListSlice';
import { deletePatientSaga } from './deletePatientSaga';

export function* rootPatientListSaga() {
	yield takeEvery(patientsListSlice.actions.deletePatientRequest.type, deletePatientSaga);
}
