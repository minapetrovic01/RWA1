export function drawInit(host: HTMLElement) {
    const container:HTMLElement=drawDiv("main-container",host);
    const left:HTMLElement=drawDiv("left-container",container);
    const right:HTMLElement=drawDiv("right-container",container);
    drawNumberPickers(left);
    initialDrawExperts(left);
  }

  function drawNumberPickers(host: HTMLElement):HTMLElement{
    const container:HTMLElement=drawDiv("numbers-container",host);
    createNumberInput("Br. alternativa",container,"alternativa-num-input",2,10);
    createNumberInput("Br. kriterijuma",container,"kriterijum-num-input",1,5);
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

function drawExpert(host: HTMLElement){

}

function initialDrawExperts(host: HTMLElement){

}

function initDrawWeights(host: HTMLElement){

}

export function initDrawMatrix(host: HTMLElement,altNum:number,critNum:number){

}

export function initDrawPie(host: HTMLElement){

}