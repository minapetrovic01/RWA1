import { fromEvent } from "rxjs";
import { combineHandlers, handleExpertCheckbox, handleNumberChange } from "../logic/eventHandlers";
import { addExpertsActive, getAlternativeNumber, getCriteriaNumber, getWeights } from "../globals";
import { Chart } from "chart.js";
import { drawPie } from "./draw";

export function drawInit(host: HTMLElement) {
  host.innerHTML = "";
  const container: HTMLElement = drawDiv("main-container", host);
  const left: HTMLElement = drawDiv("left-container", container);
  const right: HTMLElement = drawDiv("right-container", container);
  drawNumberPickers(left);
  initDrawLeftContent(left);
  initDrawRight(right);
}

export function initDrawLeftContent(host: HTMLElement) {
  const container: HTMLElement = drawDiv("left-container-content", host);
  initialDrawExperts(container);
  initDrawWeights(container);
  initDrawLabels(container);
}

function drawNumberPickers(host: HTMLElement): HTMLElement {
  const container: HTMLElement = drawDiv("numbers-container", host);
  const alternativa: HTMLElement = createNumberInput("Alternative number", container, "alternativa-num-input", 2, 10);
  const criteria: HTMLElement = createNumberInput("Criteria number", container, "kriterijum-num-input", 1, 5);
  return container;
}

export function drawDiv(className: string, host: HTMLElement): HTMLElement {
  const containerExisting = document.querySelector('.' + className);
  if (containerExisting !== null && (className === "main-container" || className === "left-container" || className === "right-container" || className === "left-container-content" || className === "experts-container" || className === "pie-container")) {
    containerExisting.innerHTML = "";
    return containerExisting as HTMLElement;
  }

  const container = document.createElement("div");
  container.classList.add(className);
  host.appendChild(container);
  return container;
}

function createNumberInput(labelText: string, host: HTMLElement, className: string, minValue: number, maxValue: number): HTMLInputElement {
  const label = document.createElement('label');
  label.textContent = labelText;
  const input = document.createElement('input');

  input.type = 'number';
  input.min = minValue.toString();
  input.max = maxValue.toString();
  input.value = minValue.toString();;
  input.classList.add(className);

  host.appendChild(label);
  host.appendChild(input);

  return input;
}

export function drawExpert(host: HTMLElement, expertNum: number) {
  const container: HTMLElement = drawDiv("expert-container" + expertNum, host);
  const label: HTMLElement = document.createElement("label");
  label.textContent = "Ex. " + expertNum;
  container.appendChild(label);
  const checkbox: HTMLInputElement = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = true;
  checkbox.classList.add("expert-checkbox");
  checkbox.id = "expert-checkbox-" + expertNum;
  container.appendChild(checkbox);
  for (let i = 0; i < getCriteriaNumber(); i++) {
    drawExpertInput(container, i + 1, expertNum);
  }
}

function drawExpertInput(host: HTMLElement, critNum: number, expertNum: number) {
  const container: HTMLElement = drawDiv("expert-input-container", host);
  const label: HTMLElement = document.createElement("label");
  label.textContent = "C" + critNum;
  container.appendChild(label);
  const input: HTMLInputElement = document.createElement("input");
  input.type = "number";
  input.min = "0";
  input.max = "100";
  input.value = "0";
  input.id = "expert-" + expertNum + "-input-" + critNum;
  input.classList.add("expert-input");
  container.appendChild(input);
}

export function initialDrawExperts(host: HTMLElement) {
  const container: HTMLElement = drawDiv("experts-container", host);
  const buttonAdd: HTMLElement = document.createElement("button");
  buttonAdd.textContent = "Add expert";
  buttonAdd.classList.add("add-expert-button");
  container.appendChild(buttonAdd);
  drawExpert(container, 1);
}

export function initDrawWeights(host: HTMLElement) {
  let container: HTMLElement = drawDiv("weights-container", host);
  const label: HTMLElement = document.createElement("label");
  label.textContent = "Weights ";
  container.appendChild(label);
  const weights: number[] = getWeights();
  for (let i = 0; i < getCriteriaNumber(); i++) {
    drawWeightCalculated(container, i + 1, weights[i]);
  }
}

export function drawWeightCalculated(host: HTMLElement, critNum: number, weight: number = 0) {
  const container: HTMLElement = drawDiv("weight-container", host);
  const label: HTMLElement = document.createElement("label");
  label.textContent = "C" + critNum;
  container.appendChild(label);
  const input: HTMLInputElement = document.createElement("input");
  input.type = "number";
  input.value = weight.toString();
  input.readOnly = true;
  input.classList.add("weight-input");
  input.id = "weight-input" + critNum;
  container.appendChild(input);
}

export function initDrawRight(host: HTMLElement) {
  host.innerHTML = "";
  drawMatrix(host);
}

export function drawMatrix(host: HTMLElement) {
  const container: HTMLElement = drawDiv("matrix-container", host);
  const label: HTMLElement = document.createElement("label");
  label.textContent = "Matrix:";
  container.appendChild(label);

  const containerCrits: HTMLElement = drawDiv("matrix-row-container", container);
  const xField: HTMLInputElement = document.createElement("input");
  xField.type = "text";
  xField.value = "A/C";
  xField.readOnly = true;
  containerCrits.appendChild(xField);
  for (let i = 0; i < getCriteriaNumber(); i++) {
    const critName: HTMLInputElement = document.createElement("input");
    critName.type = "text";
    critName.value = "C" + (i + 1);
    critName.classList.add("crt-name-input" + i);
    containerCrits.appendChild(critName);
  }

  for (let i = 0; i < getAlternativeNumber(); i++) {
    const containerRow: HTMLElement = drawDiv("matrix-row-container", container);
    const altName: HTMLInputElement = document.createElement("input");
    altName.type = "text";
    altName.value = "A" + (i + 1);
    altName.classList.add("alt-name-input");
    altName.id = "alt-name-input-" + (i + 1);
    containerRow.appendChild(altName);
    for (let j = 0; j < getCriteriaNumber(); j++) {
      drawMatrixInput(containerRow, i + 1, j + 1);
    }
  }
}

function drawMatrixInput(container: HTMLElement, alt: number, crit: number) {
  const input: HTMLInputElement = document.createElement("input");
  input.type = "number";
  input.min = "1";
  input.max = "10";
  input.value = "5";
  input.classList.add("matrix-input");
  input.id = "matrix-input-" + alt.toString() + '-' + crit.toString();
  container.appendChild(input);
}

function initDrawLabels(host: HTMLElement) {
  const container: HTMLElement = drawDiv("labels-container", host);
  const label: HTMLElement = document.createElement("label");
  label.textContent = "Who did it last:";
  label.classList.add("last-label");
  container.appendChild(label);
}
