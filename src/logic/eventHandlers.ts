import { Observable, combineLatest, debounceTime, distinctUntilChanged, fromEvent, map, merge, sampleTime, startWith, tap } from "rxjs";
import { CritAltPair } from "../models/CritAltPair";
import { ExpertCheckbox } from "../models/ExpertCheckbox";
import { ExpertCriteriaValue } from "../models/ExpertCriteriaValue";
import { AlternativeName } from "../models/AlternativeName";
import { Grade } from "../models/Grade";

export function handleNumberChange(inputField: HTMLInputElement): Observable<number> {
    return fromEvent(inputField, 'input').pipe(
        sampleTime(200),
        debounceTime(500),
        // distinctUntilChanged(),
        // startWith(1),
        map((event: Event) => Number((<HTMLInputElement>event.target).value))
    );
}

export function combineHandlers(criteriaNum: Observable<number>, alternativesNum: Observable<number>): Observable<CritAltPair> {
    return combineLatest([criteriaNum, alternativesNum]).pipe(
        map(([criteriaNum, alternativesNum]) => new CritAltPair(criteriaNum, alternativesNum))
    );
}

export function handleAddExpertButton(): Observable<any> {
    return fromEvent(document.querySelector(".add-expert-button"), "click").pipe();
}

export function handleExpertCheckbox(): Observable<ExpertCheckbox> {
    const checkboxElements = document.querySelectorAll('.expert-checkbox');

    const checkboxArray = Array.from(checkboxElements) as HTMLInputElement[];

    const checkboxObservables = checkboxArray.map(checkbox =>
        fromEvent(checkbox, 'change').pipe(
            map(() => new ExpertCheckbox(Number(checkbox.id.split('-')[2]), checkbox.checked)
            )
        )
    );
    return merge(...checkboxObservables).pipe(
        
    );
}


export function handleExpertInputChange(): Observable<any> {
    const inputElements = document.querySelectorAll('.expert-input');

    const inputArray = Array.from(inputElements) as HTMLInputElement[];

    const inputObservables = inputArray.map(input =>
        fromEvent(input, 'input').pipe(
            map(() =>new ExpertCriteriaValue(Number(input.id.split('-')[1]),Number(input.id.split('-')[3]),Number(input.value)))
        )
    );
    return merge(...inputObservables).pipe(
        tap((data)=>console.log(data))
    );
}


export function handleAlternativeNameChange():Observable<AlternativeName>{
    const inputElements=document.querySelectorAll(".alt-name-input");
    const inputArray=Array.from(inputElements) as HTMLInputElement[];
    const inputObservables=inputArray.map(input=>
        fromEvent(input,'input').pipe(
            sampleTime(200),
            debounceTime(500),
            map(()=>new AlternativeName(input.value,Number(input.id.split('-')[3])))
        )
    );
    return merge(...inputObservables).pipe(
        tap((data)=>console.log(data))
    );
}

export function handleMatrixInput():Observable<Grade>{
    const inputElements=document.querySelectorAll(".matrix-input");
    const inputArray=Array.from(inputElements) as HTMLInputElement[];
    const inputObservables=inputArray.map(input=>
        fromEvent(input,'input').pipe(
            sampleTime(200),
            debounceTime(500),
            map(()=>new Grade(Number(input.id.split('-')[3]),Number(input.id.split('-')[2]),Number(input.value)))
        )
    );
    return merge(...inputObservables);
}