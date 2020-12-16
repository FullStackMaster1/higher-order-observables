import { Injectable } from '@angular/core';
import { interval, of } from 'rxjs';
import { delay, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private _orders = [
    {
      name: 'Banana',
      price: 5,
      id: 0,
    },
    {
      name: 'Orange',
      price: 20,
      id: 1,
    },
    {
      name: 'Apple',
      price: 20,
      id: 2,
    },
    {
      name: 'Mango',
      price: 10,
      id: 3,
    },
    {
      name: 'Grapes',
      price: 80,
      id: 4,
    },
  ];

  fetchOrders(list: []) {
    return of();
  }

  fetchOrder(id: number) {
    return of(this._orders.filter((o) => o.id === id).pop()).pipe(delay(500*id));
  }

  fetchOrderIds() {
    return interval(1000).pipe(take(4));
  }
}
