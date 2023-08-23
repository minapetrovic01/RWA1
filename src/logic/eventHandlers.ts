import { Observable, combineLatest, debounceTime, distinctUntilChanged, fromEvent, map, merge, sampleTime, startWith, tap } from "rxjs";
import { CritAltPair } from "../models/CritAltPair";
import { ExpertCheckbox } from "../models/ExpertCheckbox";

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

