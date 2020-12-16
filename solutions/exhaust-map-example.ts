import { interval } from "rxjs";
import { exhaustMap, tap, take, map } from "rxjs/operators";

const outerObservable = interval(1000).pipe(take(4));
const innerObservable = interval(1000).pipe(take(2));

const exhaustSub = outerObservable.pipe(
  tap(f => console.log(`OuterObservable value: ${f}`)),
  exhaustMap(f => {
    console.log(`Mapping OuterObservable value: ${f}`);
    return innerObservable.pipe(map(s => `${f}-${s}`));
  })
);

exhaustSub.subscribe(s => console.log(`Output: ${s}`));
