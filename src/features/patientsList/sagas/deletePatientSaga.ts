/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { put, call, StrictEffect } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { send } from '../../../app/messageControl';

import { patientsListSlice } from '../patientsListSlice';

export function* deletePatientSaga({ payload }: PayloadAction<string>): Generator<StrictEffect, void, any> {
	try {
        yield call(send, `DELETE FROM Patients WHERE id=${payload};`);

		yield put(patientsListSlice.actions.deletePatientSuccess());
	} catch (e) {
		console.log(e);
		yield put(patientsListSlice.actions.deletePatientFailure());
	}
}
