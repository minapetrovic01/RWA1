import { from } from "rxjs"
import { drawInit } from "./view/drawInitial"
import { startSimulation } from "./logic/logic";
import { initailWeights } from "./globals";


console.log("hello rxjs");
initailWeights();
drawInit(document.body);
startSimulation();
