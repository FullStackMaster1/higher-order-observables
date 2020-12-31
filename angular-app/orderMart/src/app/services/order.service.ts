import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { concatMap, delay, map, take, tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { ShippingInfo } from '../models/ShippingInfo';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  searchOrder(s: string) {
    if (s) {
      return this.httpClient
        .get(`http://localhost:3000/orders?name_like=${s.trim()}`)
        .pipe(
          delay(this.getRandomDelay()),
          tap((_) => console.log(`Searching for: ${s}`))
        );
    } else {
      return this.httpClient.get(`http://localhost:3000/orders`);
    }
  }

  removeOrder(id: string) {
    return this.httpClient.delete(`http://localhost:3000/orders/${id}`).pipe(
      delay(this.getRandomDelay()),
      tap((_) => console.log(`Order Deleted: ${id}`))
    );
  }

  fetchOrders() {
    return this.httpClient.get(
      'http://localhost:3000/orders?_sort=createdDate&_order=desc'
    );
  }

  fetchOrder(id: number) {
    return this.httpClient.get(`http://localhost:3000/orders?id=${id}`);
  }

  fetchShipping(id: number) {
    return this.httpClient.get(`http://localhost:3000/shipping?id=${id}`);
  }

  addOrder(order: any) {
    order = { ...order, id: uuidv4(), createdDate: new Date() };

    return this.httpClient.post('http://localhost:3000/orders', order);
  }

  addShipping(order: any) {
    const shippingDetail: ShippingInfo = {
      id: order.id,
      status: 'Shipping Soon',
    };

    return this.httpClient.post<ShippingInfo>(
      'http://localhost:3000/shipping',
      shippingDetail
    );
  }

  // Challenge 2: Use this.addShipping(o) to add shiping info.
  submitOrder(order: any) {
    return this.addOrder(order).pipe(
      /**

         * concatMap-> submitted-1, submitted-2
         * mergeMap-> submitted-1, submitted-2
         * switchMap-> submitted-1, submitted-2
         * exhaustMap-> submitted-1, submitted-2[X], submitted-3[X]
    */
      concatMap((o) => this.addShipping(o)),
      map((x) => x.id)
    );
  }

  fetchOrderIds() {
    return interval(1000).pipe(take(4));
  }

  private getRandomDelay() {
    const delay = Math.floor(Math.random() * 10);
    return (delay + 1) * 1000;
  }
}
