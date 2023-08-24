 let alternativeNumber:number=2;
 let criteriaNumber:number=1;
 let expertNumber:number=1;

 let expertsActive:boolean[];

 let weights:number[];

 let alternativeNames:string[]=[];

 let decisionMatrix:number[][]=[];

 export function initailWeights(){
    weights=[];
    for(let i=0;i<criteriaNumber;i++){
        weights[i]=1/criteriaNumber;
       // weights[i]=0;
    }
 }

 export function setAlternativeNames(){
    for(let i=0;i<alternativeNumber;i++){
        alternativeNames[i]="A"+(i+1);	
    }
 }

    export function setDecisionMatrix(){
        decisionMatrix=[];
        for(let i=0;i<alternativeNumber;i++){
            decisionMatrix[i]=[];
            for(let j=0;j<criteriaNumber;j++){
                decisionMatrix[i][j]=5;
            }
        }
    }
    export function getDecisionMatrix():number[][]{
        return decisionMatrix;
    }
    export function setDecisionMatrixValue(value:number,alt:number,crit:number){
        decisionMatrix[alt][crit]=value;
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
    if(name.length>0){
        alternativeNames[id]=name;
    }
    else
         alternativeNames[id]="A"+(id+1);
}