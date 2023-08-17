 var alternativeNumber:number=2;
 var criteriaNumber:number=3;
 var expertNumber:number=1;

export function setAlternativeNumber(num:number){
    alternativeNumber=num;
}
export function setCriteriaNumber(num:number){
    criteriaNumber=num;
}
export function setExpertNumber(num:number){
    expertNumber=num;
}
export function getAlternativeNumber():number{
    return alternativeNumber;
}
export function getCriteriaNumber():number{
    return criteriaNumber;
}
export function getExpertNumber():number{
    return expertNumber;
}

// declare global {
//     var alternativeNumber: number;
//     var criteriaNumber: number;
//     var expertNumber: number;
// }

// export {};