import { RootState } from '../../app/store';

export const selectName = (state: RootState): string => state.patientForm.name;
export const selectSurname = (state: RootState): string => state.patientForm.surname;
export const selectPatronymic = (state: RootState): string => state.patientForm.patronymic;