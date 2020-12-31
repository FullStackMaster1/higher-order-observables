import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { catchError, exhaustMap } from 'rxjs/operators';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-submit-order',
  templateUrl: './submit-order.component.html',
  styleUrls: ['./submit-order.component.css'],
})
export class SubmitOrderComponent implements OnDestroy, OnInit {
  _submitOrder = new Subject<NgForm>();
  private _submitSubscription = null;
  @ViewChild('orderForm') orderForm: NgForm;

  constructor(
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  // Challenge 1: Tips: Use  this.orderService.submitOrder(orderForm.value) function to submit order
  ngOnInit(): void {
    this._submitSubscription = this._submitOrder
      .pipe(
        /**

         * concatMap-> submitted-1, submitted-2
         * mergeMap-> submitted-1, submitted-2
         * switchMap-> submitted-1, submitted-2
         * exhaustMap-> submitted-1, submitted-2[X], submitted-3[X]
         */

        exhaustMap((order) => this.orderService.submitOrder(order.value)),

        catchError((e) => e)
      )
      .subscribe((result) => {
        this.resetForm();
        this.showNotifiction(result);
      });
  }

  resetForm() {
    this.orderForm.resetForm();
  }

  showNotifiction(result: any) {
    this.snackBar.open(
      result.message
        ? result.message
        : `Thanks! Order Submitted successfully. Order Id: ${result}`,
      'ok',
      { duration: 3000, verticalPosition: 'top', horizontalPosition: 'left' }
    );
  }

  ngOnDestroy(): void {
    if (this._submitSubscription) {
      this._submitSubscription.unsubscribe();
    }
  }
}
