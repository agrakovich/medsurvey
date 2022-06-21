import { fork, StrictEffect } from 'redux-saga/effects';
import { rootPatientFormSaga } from './features/patientForm/sagas/rootPatientFormSaga';
import { rootPatientListSaga } from './features/patientsList/sagas/rootPatientListSaga';

export function* rootSaga(): Generator<StrictEffect, void> {
    yield fork(rootPatientFormSaga);
    yield fork(rootPatientListSaga);
}
