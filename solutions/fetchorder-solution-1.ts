import { interval, of } from "rxjs";
import { map } from "rxjs/operators";

// Solution1: to Higher order observable Exercise 
const orderSelectedAction$ = interval(3000);

const orderDetail$ = orderSelectedAction$.pipe(
  map(orderId => of({ item: "orange", price: "35", orderId }))
);

orderDetail$.subscribe(order$ => {
    // ? 
    // console.log(order$);

    order$.subscribe(order=>{
      console.log(order);
    });
});
 