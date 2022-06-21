/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { put, call, select, StrictEffect } from 'redux-saga/effects';

import { send } from '../../../app/messageControl';

import { patientFormViewSlice } from '../patientFormViewSlice';
import { selectPatientData } from '../selectors';
import type { PatientData } from '../PatientData';

export function* savePatientFormDataSaga(): Generator<StrictEffect, void, any> {
	try {
        // const SqlString = require('sqlstring');
        const patientData: PatientData = yield select(selectPatientData);
        
        // validation here

        yield call(send, `
            CREATE TABLE IF NOT EXISTS Patients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                surname TEXT,
                patronymic TEXT,
                dateOfBirth TEXT,
                dateOfAdding TEXT,
                survey BLOB
            );`);
        const dateOfAdding = new Date().toUTCString();
        yield call(send, `INSERT INTO Patients (name, surname, patronymic, dateOfBirth, dateOfAdding, survey) VALUES (
            '${patientData.name}',
            '${patientData.surname}',
            '${patientData.patronymic}',
            '${patientData.dateOfBirth}',
            '${dateOfAdding}',
            '${JSON.stringify(patientData.survey)}');`);

		yield put(patientFormViewSlice.actions.savePatientFormDataSuccess());
	} catch (e) {
		console.log(e);
		yield put(patientFormViewSlice.actions.savePatientFormDataFailure());
	}
}
