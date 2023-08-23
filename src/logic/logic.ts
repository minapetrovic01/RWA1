import { Observable, Subscription, first } from "rxjs";
import { getAlternativeNumber, getCriteriaNumber, getExpertNumber, setAlternativeNumber, setCriteriaNumber, setExpertNumber } from "../globals";
import { drawExpert, drawInit } from "../view/drawInitial";
import { combineHandlers, handleAddExpertButton, handleExpertCheckbox, handleNumberChange } from "./eventHandlers";
import { drawContent } from "../view/draw";
import { calculateWeights } from "./calculations";


export function startSimulation(){   
    handleInputs();
    handleExperts();
    handleExpertsCheckbox();
    calculateWeights();
}



function handleInputs() {
    const alternativeNumberInput:HTMLInputElement= document.querySelector(".alternativa-num-input");
    const criteriaNumberInput:HTMLInputElement= document.querySelector(".kriterijum-num-input");

    const criteriaNumPipe$:Observable<number>=handleNumberChange(criteriaNumberInput);
    const alternativeNumPipe$:Observable<number>=handleNumberChange(alternativeNumberInput);

    const criteriaSubscription:Subscription= criteriaNumPipe$.pipe().subscribe(
        (data)=>{onNumberAltCritChange(getAlternativeNumber(),data)}
    );
    const alternativeSubscription:Subscription=alternativeNumPipe$.pipe().subscribe(
        (data)=>{onNumberAltCritChange(data,getCriteriaNumber())}
    );


    combineHandlers(criteriaNumPipe$,alternativeNumPipe$).subscribe(
        (data)=>{
            criteriaSubscription.unsubscribe();
            alternativeSubscription.unsubscribe();
            onNumberAltCritChange(data.alternativeNumber,data.criteriaNumber);
            //console.log(data);
        }
    );
}

function handleExperts(){
    handleAddExpertButton().subscribe(
        (data)=>{
            onAddExpertButtonClick();
        },
       
    );
}

function handleExpertsCheckbox() {
    handleExpertCheckbox().subscribe(
        (data)=>{
            console.log(data);
        }
    );
}




function onAddExpertButtonClick(){
    console.log("clicked");
    const numOfExperts:number=getExpertNumber();
    if(numOfExperts<10){
        drawExpert(document.querySelector(".experts-container"),numOfExperts+1);
        setExpertNumber(numOfExperts+1);
    }
}

function onNumberAltCritChange(alternativeNumber:number,criteriaNumber:number){
    console.log("changed");
    setAlternativeNumber(alternativeNumber);
    setCriteriaNumber(criteriaNumber);
    setExpertNumber(1);
    console.log(alternativeNumber,criteriaNumber);

    drawContent();
    startSimulation();
}

