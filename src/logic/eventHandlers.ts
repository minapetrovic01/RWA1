import { Observable, combineLatest, debounceTime, distinctUntilChanged, fromEvent, map, sampleTime, startWith, tap } from "rxjs";
import { CritAltPair } from "../models/CritAltPair";

export function handleNumberChange(inputField: HTMLInputElement): Observable<number>{
    return fromEvent(inputField, 'input').pipe(
        sampleTime(200),
        debounceTime(500),
       // distinctUntilChanged(),
      // startWith(1),
        map((event: Event) => Number((<HTMLInputElement>event.target).value))
    );
}

export function combineHandlers(criteriaNum:Observable<number>,alternativesNum:Observable<number>):Observable<CritAltPair>{
    return combineLatest([criteriaNum,alternativesNum]).pipe(
        map(([criteriaNum,alternativesNum]) => new CritAltPair(criteriaNum,alternativesNum))
    );
}

export function handleAddExpertButton():Observable<any>{
    return fromEvent(document.querySelector(".add-expert-button"),"click").pipe();
}