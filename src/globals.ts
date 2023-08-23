 let alternativeNumber:number=2;
 let criteriaNumber:number=1;
 let expertNumber:number=1;

 let expertsActive:boolean[]=new Array();

 let weights:number[]=new Array();

 

export function setAlternativeNumber(num:number){
    alternativeNumber=num;
}
export function setCriteriaNumber(num:number){
    criteriaNumber=num;
}
export function setExpertNumber(num:number){
    expertNumber=num;
    expertsActive=new Array(num).fill(true);
}
export function getExpertsActive():boolean[]{
    return expertsActive;
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
export function getWeights():number[]{
    return weights;
}
export function setWeights(w:number[]){
    weights=w;
}
