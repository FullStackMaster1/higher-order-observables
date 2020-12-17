import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { concatMap, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Order } from '../models/Order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css'],
})
export class OrderlistComponent implements OnInit, OnDestroy {
  orders;
  search = new Subject<InputEvent>();
  remove = new Subject<string>();

  private searchResultSubscription = null;
  private orderSubscription = null;
  private removeSubscription = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.searchResultSubscription = this.search
      .pipe(
        switchMap((s: InputEvent) =>
          this.orderService.searchOrder((s.target as any).value)
        )
      )
      .subscribe(this.setOrders.bind(this));

    this.orderSubscription = this.orderService
      .fetchOrders()
      .subscribe(this.setOrders.bind(this));

    this.removeSubscription = this.remove
      .pipe(
        tap((id) => console.log(`Delete Order: ${id}`)),
        mergeMap((id) => this.orderService.removeOrder(id)),
        concatMap((_) => this.orderService.fetchOrders())
      )
      .subscribe(this.setOrders.bind(this));
  }

  setOrders(orders: Order[]) {
    this.orders = orders;
  }

  ngOnDestroy(): void {
    if (this.searchResultSubscription) {
      this.searchResultSubscription.unsubscribe();
    }
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }
    if (this.removeSubscription) {
      this.removeSubscription.unsubscribe();
    }
  }

  trackOrder(index, order) {
    return order.id;
  }
}
