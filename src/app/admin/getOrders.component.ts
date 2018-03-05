import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StaticProducts } from '../model/product.repository';
import { Cart } from '../model/cartDetail.model';
import { Router, Routes } from '@angular/router';
import { RestDataSource } from '../admin/authenticate.admin';
import { AuthService } from '../model/auth.service';
import { Client } from '../model/client.model';
import { Order } from '../model/order.model';



@Component({
    selector: 'app-adminOrders-editor',
    providers: [StaticProducts, AuthService, RestDataSource ],
    templateUrl: './adminEditor.component.html'
})
export class getOrdersComponent {
ordersList: Observable<Order[]> ;
ords: Order[];

    constructor(private data: StaticProducts,
        public cart: Cart, private router: Router,
        private auth: AuthService,
        private authenticate: RestDataSource,
        public client: Client,
        private order: Order) {}

        getOrders(){

            if (this.client.connect === true && this.client.access === true) {
                 this.ordersList = this.authenticate.getOrders();
                 this.ordersList.subscribe(ords => this.ords = ords)
            }else {
                return false;
            }
        }
       




}

