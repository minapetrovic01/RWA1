import { Observable, combineLatest, debounceTime, fromEvent, map, sampleTime } from "rxjs";
import { CritAltPair } from "../models/CritAltPair";

export function handleNumberChange(inputField: HTMLInputElement): Observable<number>{
    return fromEvent(inputField, 'input').pipe(
        sampleTime(200),
        debounceTime(500),
        map((event: Event) => (<HTMLInputElement>event.target).valueAsNumber)
    );
}

export function combineHandlers(criteriaNum:Observable<number>,alternativesNum:Observable<number>):Observable<CritAltPair>{
    return combineLatest([criteriaNum,alternativesNum]).pipe(
        map(([criteriaNum,alternativesNum]) => new CritAltPair(criteriaNum,alternativesNum))
    );
}