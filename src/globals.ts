 let alternativeNumber:number=2;
 let criteriaNumber:number=1;
 let expertNumber:number=1;

 let expertsActive:boolean[];

 let weights:number[];

 let alternativeNames:string[]=[];

 export function setAlternativeNames(){
    for(let i=0;i<alternativeNumber;i++){
        alternativeNames[i]="A"+(i+1);	
    }
 }

export function setAlternativeNumber(num:number){
    alternativeNumber=num;
   
}
export function setCriteriaNumber(num:number){
    criteriaNumber=num;
}
export function setExpertNumber(num:number){
    expertNumber=num;
    addExpertsActive();
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
export function addExpertsActive(){
    expertsActive.push(true);
}
export function reloadExpertsActive(){
    expertsActive=[];
}
export function changeExpertActive(id:number,value:boolean){
    expertsActive[id]=value;
}
export function getAlternativeNames():string[]{
    return alternativeNames;
}
export function setAlternativeName(name:string,id:number){
    alternativeNames[id]=name;
}