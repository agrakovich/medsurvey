import { RootState } from '../../app/store';

export const selectIsDeletedSuccess = (state: RootState): boolean => state.patientList.isDeletedSuccess;
export const selectIsDeletedFailure = (state: RootState): boolean => state.patientList.isDeletedFailure;
