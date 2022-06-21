import { RootState } from '../../app/store';
import type { PatientData } from './PatientData';

export const selectPatientData = (state: RootState): PatientData => state.patientForm;
export const selectIsSavedSuccess = (state: RootState): boolean => state.patientFormView.isSavedSuccess;
export const selectIsSavedFailure = (state: RootState): boolean => state.patientFormView.isSavedFailure;
