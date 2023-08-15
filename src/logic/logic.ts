import { combineHandlers, handleNumberChange } from "./eventHandlers";


export function startSimulation(){
    handleInputs();
}

function handleInputs() {
    const alternativeNumberInput:HTMLInputElement= document.querySelector(".alternativa-num-input");
    const criteriaNumberInput:HTMLInputElement= document.querySelector(".kriterijum-num-input");
    combineHandlers(handleNumberChange(criteriaNumberInput),handleNumberChange(alternativeNumberInput)).subscribe(
        (data)=>{
            console.log(data);
        }
    );
}
