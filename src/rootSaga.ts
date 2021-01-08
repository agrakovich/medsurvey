import { fork, StrictEffect } from 'redux-saga/effects';
import { rootPatientFormSaga } from './features/patientForm/sagas/rootPatientFormSaga';

export function* rootSaga(): Generator<StrictEffect, void> {
    yield fork(rootPatientFormSaga);
}
