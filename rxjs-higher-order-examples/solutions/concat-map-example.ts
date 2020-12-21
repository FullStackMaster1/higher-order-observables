import { interval } from "rxjs";
import { tap, take, map, concatMap } from "rxjs/operators";

/**
----0----1----2-------------------------------------------|-->
----0----1----(2|)------------------------------------------->
concatMap((x,y)=>xy)

----00----01----(02,10)----11----(12,20)----21----22------|--> 
*/

const outerObservable = interval(1000).pipe(take(3));
const innerObservable = interval(1000).pipe(take(3));

const concatMapSub = outerObservable.pipe(
  tap(f => console.log(`OuterObservable value: ${f}`)),

  concatMap(f => {
    console.log(`Start mapping OuterObservable value: ${f}`);

    return innerObservable.pipe(map(s => `${f}-${s}`));
  })
);

concatMapSub.subscribe(s => console.log(`Output: ${s}`));
