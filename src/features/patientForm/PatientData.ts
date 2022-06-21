export interface PatientData {
    id: string,
    name: string,
    surname: string,
    patronymic: string,
    dateOfBirth: string,
    dateOfAdding: string,
    survey: PatientSurvey
}

export interface PatientSurvey {
    diagnosisForm?: number,
    diagnosisCourse?: number,
    diagnosisRespiratoryFailure?: number,
    diagnosisDegreeOfControl?: number,
    lengthOfIllness?: number,
    immunotherapyMethods: number[],
    pharmacotherapy: number[],
    effectOfTreatmentWithAllergens: number,
    impactOnWorkFunctions: number,
    difficultyBreathing: number,
    wakeUpFrequency: number,
    inhalerUseFrequency: number,
    degreeOfControl: number,
    ageWhenWasDiagnosed: number,
    isFixedRespiratoryTractObstruction?: boolean,
    isLateStart?: boolean,
    isHardCourse?: boolean,
    isThereContactWithAllergens?: boolean,
    isPolysensitizationToAllergens?: boolean,
    isAllergicPathology?: boolean,
    isCorrectInhalationTechnique?: boolean,
    isChronicObstructivePulmonaryDisease?: boolean,
    isFollowRecommendedMode?: boolean,
    isSmoker?: boolean,
    isContinueContactWithAllergens?: boolean,
    weight?: number,
    height?: number,
    isAllergenTreatmentBefore?: boolean,
    isLateStartTreatmentWithAllergens?: boolean,
    isAutoserotherapyPerformedBefore?: boolean,
    isVariationInPeakExpiratoryFlowGreater20?: boolean,
    isIntercurrentUpperRespiratoryTractInfections?: boolean,
    isUndesirableSideEffectsOfDrugs?: boolean,
    isNotPrescribedInhaledGlucocorticosteroids?: boolean,
    isUsedIneffectiveDosesOfInhaledGlucocorticosteroids?: boolean,
    isForgotToTakeMedicationsForTreatment?: boolean,
    isSometimesInattentiveToTheHoursOfMedications?: boolean,
    isSkipMedicationsIfFeelWell?: boolean,
    isMissNextMedicationsIfFeelBad?: boolean,
    spirogram: Spirogram,
    report: string
}

export interface Spirogram {
    zhel?: number,
    do?: number,
    mod?: number,
    fzhel?: number,
    ofv1?: number,
    it?: number,
    pos?: number,
    mos25?: number,
    mos50?: number,
    mos75?: number,
    sos2575?: number
}