import {Component} from '@angular/core';
import { AuthService } from '../model/auth.service';
import { RestDataSource } from '../admin/authenticate.admin';
import { Cart } from '../model/cartDetail.model';
import { Client } from '../model/client.model';
import { Order } from '../model/order.model';

@Component({
    selector: 'app-checkout',
    providers: [AuthService, RestDataSource],
    templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
    orderConfirmed = false;
    orders: Order[] = [];
    constructor(public cart: Cart,
         public authenticate: AuthService,
         public client: Client,
         private dataSource: RestDataSource,
         private order: Order) {
            this.dataSource.getClient(this.client).subscribe(user => {
                this.client = user;
            });
    }
  /*  get person() {
            return this.authenticate.getClient(this.client);
    }*/
    submitCheckout() {

        const d = new Date();
        this.order.date = d;
        this.order.client._id = this.client._id;
        this.order.client.country = this.client.country;
        this.dataSource.saveOrder(this.order).subscribe(ord => this.order = ord);
        this.order.clear();
        this.orderConfirmed = true;
    }
}
