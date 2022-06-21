import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { patientFormSlice } from '../features/patientForm/patientFormSlice';
import { patientFormViewSlice } from '../features/patientForm/patientFormViewSlice';
import { patientsListSlice } from '../features/patientsList/patientsListSlice';
import { rootSaga } from '../rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export const store = configureStore({
  middleware,
  reducer: {
    patientForm: patientFormSlice.reducer,
    patientFormView: patientFormViewSlice.reducer,
    patientList: patientsListSlice.reducer
  },
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
