import { fromEvent } from "rxjs";
import { combineHandlers, handleNumberChange } from "../logic/eventHandlers";
import { getAlternativeNumber, getCriteriaNumber } from "../globals";

export function drawInit(host: HTMLElement) {
    const container:HTMLElement=drawDiv("main-container",host);
    const left:HTMLElement=drawDiv("left-container",container);
    const right:HTMLElement=drawDiv("right-container",container);
    drawNumberPickers(left);
    initialDrawExperts(left);
    initDrawWeights(left);
    initDrawRight(right);
  }

  function drawNumberPickers(host: HTMLElement):HTMLElement{
    const container:HTMLElement=drawDiv("numbers-container",host);
    const alternativa:HTMLElement=createNumberInput("Br. alternativa",container,"alternativa-num-input",2,10);
    const criteria:HTMLElement=createNumberInput("Br. kriterijuma",container,"kriterijum-num-input",1,5);
    return container;
  }

 export function drawDiv(className:string,host:HTMLElement):HTMLElement{
    const container = document.createElement("div");
    container.classList.add(className);
    host.appendChild(container);
    return container;
  }

  function createNumberInput(labelText: string,host:HTMLElement,className:string,minValue:number,maxValue:number): HTMLInputElement {
    const label = document.createElement('label');
    label.textContent = labelText;
    const input = document.createElement('input');
    

    input.type = 'number';
    input.min = minValue.toString();
    input.max = maxValue.toString();
    input.value=minValue.toString();;
    input.classList.add(className);

    host.appendChild(label);
    host.appendChild(input);

    return input;
}

export function drawExpert(host: HTMLElement,expertNum:number){
  const container:HTMLElement=drawDiv("expert-container"+expertNum,host);
  const label:HTMLElement=document.createElement("label");
  label.textContent="Ex. "+expertNum;
  container.appendChild(label);
  const checkbox:HTMLInputElement=document.createElement("input");
  checkbox.type="checkbox";
  checkbox.checked=true;
  checkbox.classList.add("expert-checkbox"+expertNum);
  container.appendChild(checkbox);
  for(let i=0;i<getCriteriaNumber();i++){
    drawExpertInput(container,i+1);
  }
}

function drawExpertInput(host: HTMLElement,critNum:number){
  const container:HTMLElement=drawDiv("expert-input-container",host);
  const label:HTMLElement=document.createElement("label");
  label.textContent="K"+critNum;
  container.appendChild(label);
  const input:HTMLInputElement=document.createElement("input");
  input.type="number";
  input.min="0";
  input.max="100";
  input.value="0";
  input.classList.add("expert-input");
  container.appendChild(input);
}

function initialDrawExperts(host: HTMLElement){
  const container:HTMLElement=drawDiv("experts-container",host);
  const buttonAdd:HTMLElement=document.createElement("button");
  buttonAdd.textContent="Add expert";
  buttonAdd.classList.add("add-expert-button");
  container.appendChild(buttonAdd);
  drawExpert(container,1);
}

function initDrawWeights(host: HTMLElement){
  const containerExisting = document.querySelector('.weights-container');
  let container:HTMLElement;
  if(containerExisting===null){
    container=drawDiv("weights-container",host);
  }else{
    container=containerExisting as HTMLElement;
    container.innerHTML="";
  }
 
  const label:HTMLElement=document.createElement("label");
  label.textContent="Weights:";
  container.appendChild(label);
  for(let i=0;i<getCriteriaNumber();i++){
    drawWeightCalculated(container,i+1);
  }
}

function drawWeightCalculated(host: HTMLElement,critNum:number,weight:number=0){
  const container:HTMLElement=drawDiv("weight-container",host);
  const label:HTMLElement=document.createElement("label");
  label.textContent="K"+critNum;
  container.appendChild(label);
  const input:HTMLInputElement=document.createElement("input");
  input.type="number";
  input.value=weight.toString();
  input.readOnly=true;
  input.classList.add("weight-input");
  container.appendChild(input);
}

export function initDrawRight(host: HTMLElement){
  host.innerHTML="";
  drawNameInputs(host);
  drawMatrix(host);
}

export function drawMatrix(host: HTMLElement){
  const containerExisting = document.querySelector('.matrix-container');
  let container:HTMLElement;

  if(containerExisting===null){
    container=drawDiv("matrix-container",host);
  }else{
    container=containerExisting as HTMLElement;
    container.innerHTML="";
  }
  const label:HTMLElement=document.createElement("label");
  label.textContent="Matrix:";
  container.appendChild(label);

  const containerCrits:HTMLElement=drawDiv("matrix-row-container",container);
  const labelRow:HTMLElement=document.createElement("label");
  labelRow.textContent=".";
  containerCrits.appendChild(labelRow);
  for(let i=0;i<getCriteriaNumber();i++){
    const label:HTMLElement=document.createElement("label");
    label.textContent="C"+(i+1);
    containerCrits.appendChild(label);
  }
 
  for(let i=0;i<getAlternativeNumber();i++){
    const containerRow:HTMLElement=drawDiv("matrix-row-container",container);
    const label:HTMLElement=document.createElement("label");
    label.textContent="A"+(i+1);
    containerRow.appendChild(label);
    for(let j=0;j<getCriteriaNumber();j++){
      drawMatrixInput(containerRow,i+1,j+1);
    }
  }


  
}

function drawMatrixInput(container: HTMLElement, arg1: number, arg2: number) {
  const input:HTMLInputElement=document.createElement("input");
  input.type="number";
  input.min="1";
  input.max="10";
  input.value="5";
  input.classList.add("matrix-input"+arg1.toString()+arg2.toString());
  container.appendChild(input);
}



function drawNameInputs(container: HTMLElement) {
  const containerExisting = document.querySelector('.name-inputs-container');
  let containerName:HTMLElement;
  if(containerExisting===null){
    containerName=drawDiv("name-inputs-container",container);
  }
  else{
    containerName=containerExisting as HTMLElement;
    containerName.innerHTML="";
  }

  const altNamesContainer:HTMLElement=drawDiv("alt-names-container",containerName)
  const label:HTMLElement=document.createElement("label");
  label.textContent="Names of alternatives:";
  altNamesContainer.appendChild(label);
  for(let i=0;i<getAlternativeNumber();i++){
    const input:HTMLInputElement=document.createElement("input");
    input.type="text";
    input.value="A"+(i+1);
    input.classList.add("alt-name-input"+i);
    altNamesContainer.appendChild(input);
  }

  const crtNamesContainer:HTMLElement=drawDiv("crt-names-container",containerName)
  const labelcrt:HTMLElement=document.createElement("label");
  labelcrt.textContent="Names of criterias:";
  crtNamesContainer.appendChild(labelcrt);
  for(let i=0;i<getCriteriaNumber();i++){
    const input:HTMLInputElement=document.createElement("input");
    input.type="text";
    input.value="C"+(i+1);
    input.classList.add("crt-name-input"+i);
    crtNamesContainer.appendChild(input);
  }
}


export function initDrawPie(host: HTMLElement, values:number[],labels:string[]){
  const containerExisting = document.querySelector('.pie-container');
  let container:HTMLElement;

  if(containerExisting===null){
    container=drawDiv("pie-container",host);
  }else{
    container=containerExisting as HTMLElement;
    container.innerHTML="";
  }

  const label:HTMLElement=document.createElement("label");
  label.textContent="Result:";
  container.appendChild(label);

  

}