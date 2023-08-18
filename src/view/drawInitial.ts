import { fromEvent } from "rxjs";
import { combineHandlers, handleNumberChange } from "../logic/eventHandlers";
import { getCriteriaNumber } from "../globals";

export function drawInit(host: HTMLElement) {
    const container:HTMLElement=drawDiv("main-container",host);
    const left:HTMLElement=drawDiv("left-container",container);
    const right:HTMLElement=drawDiv("right-container",container);
    drawNumberPickers(left);
    initialDrawExperts(left);
    initDrawWeights(left);
  }

  function drawNumberPickers(host: HTMLElement):HTMLElement{
    const container:HTMLElement=drawDiv("numbers-container",host);
    const alternativa:HTMLElement=createNumberInput("Br. alternativa",container,"alternativa-num-input",2,10);
    const criteria:HTMLElement=createNumberInput("Br. kriterijuma",container,"kriterijum-num-input",1,5);
    return container;
  }

  function drawDiv(className:string,host:HTMLElement):HTMLElement{
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
  const container:HTMLElement=drawDiv("weights-container",host);
  const label:HTMLElement=document.createElement("label");
  label.textContent="Weights:";
  container.appendChild(label);
  for(let i=0;i<getCriteriaNumber();i++){
    drawWeightCalculated(container,i+1);
  }
}

function drawWeightCalculated(host: HTMLElement,critNum:number){
  const container:HTMLElement=drawDiv("weight-container",host);
  const label:HTMLElement=document.createElement("label");
  label.textContent="K"+critNum;
  container.appendChild(label);
  const input:HTMLInputElement=document.createElement("input");
  input.type="number";
  input.value="0";
  input.readOnly=true;
  input.classList.add("weight-input");
  container.appendChild(input);
}

export function initDrawMatrix(host: HTMLElement,altNum:number,critNum:number){

}

export function initDrawPie(host: HTMLElement){

}