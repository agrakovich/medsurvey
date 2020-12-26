export interface PatientSurvey {
    name: string,
    surname: string,
    patronymic: string,
    age: number,
    bronchialAsthmaForm: string,
    bronchialAsthmaCourse: string,
    bronchialAsthmaRespiratoryFailure: string,
    bronchialAsthmaLengthOfIllness: number,
    immunotherapyMethods: string[],
    pharmacotherapy: string[],
    effectOfTreatmentWithAllergens: string
}