import bb, {pie} from "billboard.js";
//import "billboard.js/dist/billboard.css";
import { getCriteriaNumber, getWeights } from "../globals";
import { calculateWeights } from "../logic/calculations";
import { drawDiv, drawWeightCalculated, initDrawLeftContent, initDrawRight, initDrawWeights, initialDrawExperts } from "./drawInitial";

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

export function drawPie(grades:number[],labels:string[]){

  const container:HTMLElement=drawDiv("pie-container",document.querySelector(".right-container"));

  const label:HTMLElement=document.createElement("label");
  label.textContent="Result:";
  container.appendChild(label);

  const div:HTMLElement=document.createElement("div");
  div.classList.add("pieChart");
  
  div.id="pieChart";

  container.appendChild(div);

  const data: [string, number][] = labels.map((label, index) => [label, grades[index]]);

  var chart = bb.generate({
    data: {
    //   columns: [
    // ["data1", 30],
    // ["data2", 50],
    // ["data3", 20]
    //   ],
      columns: data,
      type: pie(), // for ESM specify as: pie()
    },
    pie: {
      innerRadius: 20
    },
    bindto: "#pieChart"
  });
  
}