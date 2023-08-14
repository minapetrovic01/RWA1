export function drawInit(host: HTMLElement) {
    const container:HTMLElement=drawDiv("main-container",host);
    const left:HTMLElement=drawDiv("left-container",container);
    const right:HTMLElement=drawDiv("right-container",container);
  }

  function drawNumberPickers(host: HTMLElement){
    const container = document.createElement("div");
    container.classList.add("numbers-container");
    host.appendChild(container);
    return container;
  }

  function drawDiv(className:string,host:HTMLElement):HTMLElement{
    const container = document.createElement("div");
    container.classList.add(className);
    host.appendChild(container);
    return container;
  }