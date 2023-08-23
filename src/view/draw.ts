import { getCriteriaNumber, getWeights } from "../globals";
import { calculateWeights } from "../logic/calculations";
import { drawWeightCalculated, initDrawLeftContent, initDrawRight, initDrawWeights, initialDrawExperts } from "./drawInitial";

export function drawContent(){
  initDrawRight(document.querySelector(".right-container"));
  initDrawLeftContent(document.querySelector(".left-container"));
}

export function drawWeights(){
  const weights:number[]=calculateWeights();
  const container:HTMLElement=document.querySelector(".weights-container");
  container.innerHTML = "";
  const label: HTMLElement = document.createElement("label");
  label.textContent = "Weights:";
  container.appendChild(label);
  for (let i = 0; i < getCriteriaNumber(); i++) {
    drawWeightCalculated(container, i + 1, weights[i]);
  }
}