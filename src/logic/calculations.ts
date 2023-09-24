import { getCriteriaNumber, getExpertNumber, setWeights } from "../globals";


export function calculateWeights():number[]{
    const expertsNumber:number=getExpertNumber();
    const criteriaNumber:number=getCriteriaNumber();
    const weights:number[]= Array(criteriaNumber).fill(0);
    const expertsActive:boolean[]=getExpertsActive();

   // console.log(expertsActive);

    for(let i=0;i<expertsNumber;i++){
        if(!expertsActive[i]) continue;
        let hisWeights:number[]=new Array(criteriaNumber).fill(0);
        for(let j=0;j<criteriaNumber;j++){
            const input:HTMLInputElement=document.querySelector("#expert-"+(i+1)+"-input-"+(j+1));
            hisWeights[j]=Number(input.value);
        }
        const sum:number=hisWeights.reduce((a,b)=>a+b,0);
        if(sum!==0)
            hisWeights.forEach((w,i)=>weights[i]+=w/sum);
        else
            weights.forEach((w,i)=>weights[i]+=w);
    }

    const activeNumber:number=expertsActive.filter((e)=>e).length;
    if(activeNumber==0){
        setWeights(Array(criteriaNumber).fill(1./criteriaNumber));
        return Array(criteriaNumber).fill(1./criteriaNumber);
    }
    weights.forEach((w,i)=>weights[i]=w/activeNumber);
    setWeights(weights);

   // console.log(weights);
    return weights;
}

function getExpertsActive():boolean[]{
    const expertsNumber:number=getExpertNumber();
    const expertsActive:boolean[]=new Array(expertsNumber).fill(true);
    const checkboxes:NodeListOf<HTMLInputElement>=document.querySelectorAll(".expert-checkbox");
    checkboxes.forEach((checkbox)=>{
        const id:string=checkbox.id;
        const expertNumber:number=Number(id.split("-")[2]);
        const checked:boolean=checkbox.checked;
        expertsActive[expertNumber-1]=checked;
    });
    return expertsActive;
}