import { PatientSurvey } from '../features/patientForm/PatientData';

import { AgeOfEarlyDiagnosis } from './constants';

export const calculateInfluencingFactors = (survey: PatientSurvey): number => {
    return Number(survey.ageWhenWasDiagnosed >= AgeOfEarlyDiagnosis)
    + Number();
}

export const calculateBMI = (weight?: number, height?: number): number | undefined => {
    if (!weight || !height) {
        return undefined;
    }

    const heightInMeters = height / 100;
    return weight / Math.pow(heightInMeters, 2);
}
