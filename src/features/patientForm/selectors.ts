import { RootState } from '../../app/store';

export const selectName = (state: RootState): string => state.patientForm.name;
export const selectSurname = (state: RootState): string => state.patientForm.surname;
export const selectPatronymic = (state: RootState): string => state.patientForm.patronymic;

export const selectDateOfBirth = (state: RootState): string => state.patientForm.dateOfBirth;

export const selectDiagnosisForm = (state: RootState): number | undefined => state.patientForm.diagnosisForm;
export const selectDiagnosisCourse = (state: RootState): number | undefined => state.patientForm.diagnosisCourse;
export const selectDiagnosisRespiratoryFailure = (state: RootState): number | undefined => state.patientForm.diagnosisRespiratoryFailure;
export const selectDiagnosisDegreeOfControl = (state: RootState): number | undefined => state.patientForm.diagnosisDegreeOfControl;

export const selectLengthOfIllness = (state: RootState): number | undefined => state.patientForm.lengthOfIllness;
