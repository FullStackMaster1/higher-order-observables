import { interval } from "rxjs";
import { switchMap, tap, take, map } from "rxjs/operators";

const outerObservable = interval(1000).pipe(take(4));

const innerObservable = interval(1000).pipe(take(2));

const switchSub = outerObservable.pipe(
  tap(f => console.log(`OuterObservable value: ${f}`)),
  switchMap(f => {
    console.log(`Start mapping OuterObservable value: ${f}`);

    return innerObservable.pipe(map(s => `${f}-${s}`));
  })
);

switchSub.subscribe(s => console.log(`Output: ${s}`));