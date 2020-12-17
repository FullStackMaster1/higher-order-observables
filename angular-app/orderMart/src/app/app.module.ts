import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { OrderdetailComponent } from './orderdetail/orderdetail.component';
import { DemoMaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { SubmitOrderComponent } from './submit-order/submit-order.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    OrderlistComponent,
    OrderdetailComponent,
    SubmitOrderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path:'',
        pathMatch:'full',
        redirectTo:'/list',
      },
      {
        path:'submit',
        component:SubmitOrderComponent
      },
      {
        path:'list',
        component:OrderlistComponent
      },
      {
        path:'detail',
        component:OrderdetailComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
