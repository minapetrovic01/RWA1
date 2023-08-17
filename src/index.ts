import { from } from "rxjs"
import { drawInit } from "./view/drawInitial"
import { startSimulation } from "./logic/logic";


console.log("hello rxjs");

drawInit(document.body);
startSimulation();
