import { interval, of } from "rxjs";
import { map } from "rxjs/operators";

// Solution-2
const orderSelectedAction$ = interval(3000);

const orderDetail$ = orderSelectedAction$.pipe(
  map(orderId => {
    let order = null;

    //fetch order from server, returns observable only
    of({ item: "apple", price: 22, orderId }).subscribe(orderFromServer => {
      order = orderFromServer;
    });

    return order;
  })
);

orderDetail$.subscribe(order => console.log(order));
