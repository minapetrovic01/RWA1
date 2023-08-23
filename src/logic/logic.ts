import { Observable, Subscription, first } from "rxjs";
import { addExpertsActive, changeExpertActive, getAlternativeNumber, getCriteriaNumber, getExpertNumber, reloadExpertsActive, setAlternativeName, setAlternativeNames, setAlternativeNumber, setCriteriaNumber, setExpertNumber } from "../globals";
import { drawExpert, drawInit } from "../view/drawInitial";
import { combineHandlers, handleAddExpertButton, handleAlternativeNameChange, handleExpertCheckbox, handleExpertInputChange, handleMatrixInput, handleNumberChange } from "./eventHandlers";
import { drawContent, drawWeights } from "../view/draw";
import { calculateWeights } from "./calculations";


let checkboxSubscription:Subscription;
let expertInputSubscription:Subscription;
let alternativeNameSubscription:Subscription;
let matrixValueSubscription:Subscription;

export function startSimulation(){   
    reloadExpertsActive();
    setAlternativeNames();
    handleInputs();
    handleExperts();
    handleExpertsInputChange();
    handleExpertsCheckbox();
    //calculateWeights();
    handleAlternativesNameChange();
    handleMatrixInputs();
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
    reloadExpertsActive();
    handleAddExpertButton().subscribe(
        (data)=>{
            onAddExpertButtonClick();
            handleExpertsCheckbox();
            handleExpertsInputChange();
        },
       
    );
}

function handleAlternativesNameChange(){
    alternativeNameSubscription=handleAlternativeNameChange().subscribe(
        (data)=>{
          //TODO: promene u piti
            console.log(data);
            setAlternativeName(data.value,data.altNum-1);
        }
    );
}


function handleExpertsInputChange(){
    if(expertInputSubscription){
        expertInputSubscription.unsubscribe();
    }
    expertInputSubscription=handleExpertInputChange().subscribe(
        (data)=>{
            drawWeights();
            setLastLabel(data.expertNumber,data.criteriaNumber,data.value);
        }
    );
}

function handleExpertsCheckbox() {
    if(checkboxSubscription){
        checkboxSubscription.unsubscribe();
    }
   checkboxSubscription= handleExpertCheckbox().subscribe(
        (data)=>{
            changeExpertActive(data.expertNumber-1,data.value);
            console.log(data);
            drawWeights();
        }
    );
}


function onAddExpertButtonClick(){
    console.log("clicked");
    const numOfExperts:number=getExpertNumber();
    if(numOfExperts<10){
        drawExpert(document.querySelector(".experts-container"),numOfExperts+1);
        setExpertNumber(numOfExperts+1);
        calculateWeights();
        drawWeights();
    }
}

function onNumberAltCritChange(alternativeNumber:number,criteriaNumber:number){
    console.log("changed");
    setAlternativeNumber(alternativeNumber);
    setCriteriaNumber(criteriaNumber);
   // reloadExpertsActive();
    setExpertNumber(1);
    //console.log(alternativeNumber,criteriaNumber);
    drawContent();
    startSimulation();
}

function setLastLabel(expertNumber: number, criteriaNumber: number, value: number) {
    const label:HTMLElement=document.querySelector(".labels-container");
    label.textContent="Who did it last:"+" expert number "+ expertNumber +" changed "+ criteriaNumber + " criteria weight to " + value+"."	;
}


function handleMatrixInputs(){
    if(matrixValueSubscription){
        matrixValueSubscription.unsubscribe();
    }
    matrixValueSubscription=handleMatrixInput().subscribe(
        (data)=>{
            console.log(data);
            //TODO: promene u matrici
            //TODO: promene u piti
        }
    );
}
