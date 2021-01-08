/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { put, call, select, StrictEffect } from 'redux-saga/effects';

import { send } from '../../../app/messageControl';

import { patientFormSlice } from '../patientFormSlice';

import {
    selectName,
    selectSurname,
    selectPatronymic,
    selectDateOfBirth
} from '../selectors';

export function* savePatientFormDataSaga(): Generator<StrictEffect, void, any> {
	try {
        const name: string = yield select(selectName);
        const surName: string = yield select(selectSurname);
        const patronymic: string = yield select(selectPatronymic);

        const dateOfBirth: string = yield select(selectDateOfBirth);
        
        // validation here

        yield call(send, `
            CREATE TABLE IF NOT EXISTS Patients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                surname TEXT,
                patronymic TEXT,
                dateOfBirth TEXT
            );`);
        yield call(send, `INSERT INTO Patients (name, surname, patronymic, dateOfBirth) VALUES (
            '${name}',
            '${surName}',
            '${patronymic}',
            '${dateOfBirth}');`);

		yield put(patientFormSlice.actions.savePatientFormDataSuccess());
	} catch (e) {
		console.log(e);
		yield put(patientFormSlice.actions.savePatientFormDataFailure());
	}
}
