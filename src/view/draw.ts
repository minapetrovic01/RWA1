import { initDrawLeftContent, initDrawRight, initDrawWeights, initialDrawExperts } from "./drawInitial";

export function drawContent(){
  initDrawRight(document.querySelector(".right-container"));
  initDrawLeftContent(document.querySelector(".left-container"));
}