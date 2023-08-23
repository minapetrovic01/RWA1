import { fromEvent } from "rxjs";
import { combineHandlers, handleNumberChange } from "../logic/eventHandlers";
import { getAlternativeNumber, getCriteriaNumber } from "../globals";
import { Chart } from "chart.js";

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
}

function drawNumberPickers(host: HTMLElement): HTMLElement {
  const container: HTMLElement = drawDiv("numbers-container", host);
  const alternativa: HTMLElement = createNumberInput("Alternative number", container, "alternativa-num-input", 2, 10);
  const criteria: HTMLElement = createNumberInput("Criteria number", container, "kriterijum-num-input", 1, 5);
  return container;
}

export function drawDiv(className: string, host: HTMLElement): HTMLElement {
  const containerExisting = document.querySelector('.' + className);
  if (containerExisting !== null && (className === "main-container" || className === "left-container" || className === "right-container" || className === "left-container-content" || className === "experts-container")) {
    containerExisting.innerHTML = "";
    return containerExisting as HTMLElement;
  }
  // if (containerExisting !== null) {
  //   containerExisting.innerHTML = "";
  //   return containerExisting as HTMLElement;
  // }
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
    drawExpertInput(container, i + 1,expertNum);
  }
}

function drawExpertInput(host: HTMLElement, critNum: number,expertNum:number) {
  const container: HTMLElement = drawDiv("expert-input-container", host);
  const label: HTMLElement = document.createElement("label");
  label.textContent = "C" + critNum;
  container.appendChild(label);
  const input: HTMLInputElement = document.createElement("input");
  input.type = "number";
  input.min = "0";
  input.max = "100";
  input.value = "0";
  input.id = "expert"+expertNum+"-input"+critNum;
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
  label.textContent = "Weights:";
  container.appendChild(label);
  for (let i = 0; i < getCriteriaNumber(); i++) {
    drawWeightCalculated(container, i + 1);
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
  //drawNameInputs(host);
  drawMatrix(host);
  initDrawPie(host, [0.5, 0.2, 0.1, 0.1, 0.1], ["ana", "dina", "kaja", "lana", "jana"]);
}

export function drawMatrix(host: HTMLElement) {
  const container: HTMLElement = drawDiv("matrix-container", host);
  const label: HTMLElement = document.createElement("label");
  label.textContent = "Matrix:";
  container.appendChild(label);

  const containerCrits: HTMLElement = drawDiv("matrix-row-container", container);
  // const labelRow: HTMLElement = document.createElement("label");
  // labelRow.textContent = ".";
  // containerCrits.appendChild(labelRow);
  const xField: HTMLInputElement = document.createElement("input");
  xField.type = "text";
  xField.value = "A/C";
  xField.readOnly = true;
  containerCrits.appendChild(xField);
  for (let i = 0; i < getCriteriaNumber(); i++) {
    // const label: HTMLElement = document.createElement("label");
    // label.textContent = "C" + (i + 1);
    // containerCrits.appendChild(label);
    const critName: HTMLInputElement = document.createElement("input");
    critName.type = "text";
    critName.value = "C" + (i + 1);
    critName.classList.add("crt-name-input" + i);
    containerCrits.appendChild(critName);
  }

  for (let i = 0; i < getAlternativeNumber(); i++) {
    const containerRow: HTMLElement = drawDiv("matrix-row-container", container);
    // const label: HTMLElement = document.createElement("label");
    // label.textContent = "A" + (i + 1);
    // containerRow.appendChild(label);
    const altName: HTMLInputElement = document.createElement("input");
    altName.type = "text";
    altName.value = "A" + (i + 1);
    altName.classList.add("alt-name-input" + i);
    containerRow.appendChild(altName);
    for (let j = 0; j < getCriteriaNumber(); j++) {
      drawMatrixInput(containerRow, i + 1, j + 1);
    }
  }
}

function drawMatrixInput(container: HTMLElement, arg1: number, arg2: number) {
  const input: HTMLInputElement = document.createElement("input");
  input.type = "number";
  input.min = "1";
  input.max = "10";
  input.value = "5";
  input.classList.add("matrix-input" + arg1.toString() + arg2.toString());
  container.appendChild(input);
}

function drawNameInputs(container: HTMLElement) {
  // const containerName: HTMLElement = drawDiv("name-inputs-container", container);
  // const altNamesContainer: HTMLElement = drawDiv("alt-names-container", containerName)
  // const label: HTMLElement = document.createElement("label");
  // label.textContent = "Names of alternatives:";
  // altNamesContainer.appendChild(label);
  // for (let i = 0; i < getAlternativeNumber(); i++) {
  //   const input: HTMLInputElement = document.createElement("input");
  //   input.type = "text";
  //   input.value = "A" + (i + 1);
  //   input.classList.add("alt-name-input" + i);
  //   altNamesContainer.appendChild(input);
  // }

  // const crtNamesContainer: HTMLElement = drawDiv("crt-names-container", containerName)
  // const labelcrt: HTMLElement = document.createElement("label");
  // labelcrt.textContent = "Names of criterias:";
  // crtNamesContainer.appendChild(labelcrt);
  // for (let i = 0; i < getCriteriaNumber(); i++) {
  //   const input: HTMLInputElement = document.createElement("input");
  //   input.type = "text";
  //   input.value = "C" + (i + 1);
  //   input.classList.add("crt-name-input" + i);
  //   crtNamesContainer.appendChild(input);
  // }
}


export function initDrawPie(host: HTMLElement, values: number[], labels: string[]) {
  const container: HTMLElement = drawDiv("pie-container", host);
  const label: HTMLElement = document.createElement("label");
  label.textContent = "Result:";
  container.appendChild(label);
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  const results = [
    { mood: "Angry", total: 1499, shade: "#0a9627" },
    { mood: "Happy", total: 478, shade: "#960A2C" },
    { mood: "Melancholic", total: 332, shade: "#332E2E" },
    { mood: "Gloomy", total: 195, shade: "#F73809" }
  ];

  let sum = 0;
  let totalNumberOfPeople = results.reduce((sum, { total }) => sum + total, 0);
  let currentAngle = 0;

  for (let moodValue of results) {
    let portionAngle = (moodValue.total / totalNumberOfPeople) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(100, 100, 100, currentAngle, currentAngle + portionAngle);
    currentAngle += portionAngle;
    ctx.lineTo(100, 100);
    ctx.fillStyle = moodValue.shade;
    ctx.fill();

    // Calculate the position for the label
    let labelAngle = currentAngle - portionAngle / 2;
    let labelX = 100 + Math.cos(labelAngle) * 70;
    let labelY = 100 + Math.sin(labelAngle) * 70;

    // Draw the label
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.fillText(moodValue.mood, labelX, labelY);
  }
}