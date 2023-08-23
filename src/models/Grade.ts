export class Grade{
    criteriaNumber: number;
    alternativeNumber: number;
    grade: number;

    constructor(criteriaNumber: number, alternativeNumber: number, grade: number){ 
        this.criteriaNumber = criteriaNumber;
        this.alternativeNumber = alternativeNumber;
        this.grade = grade;
    }
}