export class ExpertCriteriaValue {
    expertNumber: number;
    criteriaNumber: number;
    value: number;

    constructor(expertNumber: number, criteriaNumber: number, value: number) {
        this.expertNumber = expertNumber;
        this.criteriaNumber = criteriaNumber;
        this.value = value;
    }
}