import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { OrderdetailComponent } from './orderdetail/orderdetail.component';
import { DemoMaterialModule } from './material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    OrderlistComponent,
    OrderdetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    RouterModule.forRoot([
      {
        path:'',
        pathMatch:'full',
        redirectTo:'/list',
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
