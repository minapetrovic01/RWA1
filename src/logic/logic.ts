import { getExpertNumber, setAlternativeNumber, setCriteriaNumber, setExpertNumber } from "../globals";
import { drawExpert } from "../view/drawInitial";
import { combineHandlers, handleAddExpertButton, handleNumberChange } from "./eventHandlers";


export function startSimulation(){
    
    handleInputs();
    handleAddExpertButton().subscribe(
        (data)=>{
            console.log("clicked");
            if(getExpertNumber()<10){
                drawExpert(document.querySelector(".experts-container"),getExpertNumber()+1);
                setExpertNumber(getExpertNumber()+1);
            }
        },
       
    );
}

function handleInputs() {
    const alternativeNumberInput:HTMLInputElement= document.querySelector(".alternativa-num-input");
    const criteriaNumberInput:HTMLInputElement= document.querySelector(".kriterijum-num-input");
    combineHandlers(handleNumberChange(criteriaNumberInput),handleNumberChange(alternativeNumberInput)).subscribe(
        (data)=>{
            console.log(data);
            setAlternativeNumber(data.alternativeNumber);
            setCriteriaNumber(data.criteriaNumber);
        }
    );
}
