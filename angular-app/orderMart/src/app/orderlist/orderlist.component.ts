import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css'],
})
export class OrderlistComponent implements OnInit {
  orders$;
  constructor(private orderService: OrderService) {}

  options = ['orange', 'apple'];

  ngOnInit(): void {
    this.orderService.fetchOrders([1,2,3,4]);
  }
}
