import { interval } from "rxjs";
import { tap, take, map, mergeMap } from "rxjs/operators";

/**
  ----0----1----2------------->
  ----0----1----(2|)---------->
    mergeMap((x,y)=>xy)
  ----00----(01,10)----(02,11,20)----(12,21)----(22|)-->  
 */
const outerObservable = interval(1000).pipe(take(3));
const innerObservable = interval(1000).pipe(take(3));

const mergeMapSub = outerObservable.pipe(
  tap(f => console.log(`OuterObservable value: ${f}`)),
  mergeMap(f => {
    console.log(`Start mapping OuterObservable value: ${f}`);

    return innerObservable.pipe(map(s => `${f}-${s}`));
  })
);
mergeMapSub.subscribe(s => console.log(`Output: ${s}`));