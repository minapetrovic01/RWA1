import { getCriteriaNumber, getExpertNumber, getExpertsActive } from "../globals";


export function calculateWeights():number[]{
    const expertsNumber:number=getExpertNumber();
    const criteriaNumber:number=getCriteriaNumber();
    const weights:number[]= new Array(criteriaNumber).fill(0);
    const expertsActive:boolean[]=getExpertsActive();

    for(let i=0;i<expertsNumber;i++){
        if(!expertsActive[i]) continue;
        let hisWeights:number[]=new Array(criteriaNumber).fill(0);
        for(let j=0;j<criteriaNumber;j++){
            const input:HTMLInputElement=document.querySelector("#expert"+(i+1)+"-input"+(j+1));
            hisWeights[j]=input.valueAsNumber;
        }
        const sum:number=hisWeights.reduce((a,b)=>a+b,0);
        hisWeights.forEach((w,i)=>weights[i]+=w/sum);
    }

    const activeNumber:number=expertsActive.filter((e)=>e).length;
    weights.forEach((w,i)=>weights[i]=w/activeNumber);

    console.log(weights);
    return weights;
}