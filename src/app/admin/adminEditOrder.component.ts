import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { StaticProducts } from '../model/product.repository';
import { Cart } from '../model/cartDetail.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestDataSource } from '../admin/authenticate.admin';
import { AuthService } from '../model/auth.service';
import { Client } from '../model/client.model';
import { Order } from '../model/order.model';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'app-editor',
    providers: [StaticProducts, AuthService, RestDataSource, DatePipe],
    templateUrl: './adminEditOrder.component.html'
})
export class AdminEditOrderComponent {
    private orderId: number = null;
    openBoard = false;
    shipped: string = null;
    messageSuccess = null;
    clientBoard = false;
    clientOrders: Order[] = [];
    constructor(private data: StaticProducts,
        public cart: Cart,
        private router: Router,
        private authenticate: RestDataSource,
        private activatedRoute: ActivatedRoute,
        private order: Order,
    public client:Client) {
            this.activatedRoute.queryParams
                .subscribe((queryParams: Params) => {
                    this.orderId = queryParams['id'];
                });
         }


    seeOrder(id) {
        this.authenticate.getOrder(id).subscribe(ord => this.order = ord);
        this.openBoard = true;
    }
    save(order) {
        const d = new Date();
        const dTime = d.toLocaleTimeString();
        const dDay = d.toDateString();
        this.order.modified = `${dDay}+ +${dTime}`;
        this.authenticate.updateOrder(order).subscribe();
        this.messageSuccess = 'Votre commande a été mise à jour';
    }
    showClient(client) {
        if (this.clientBoard === false) {
            this.clientBoard = true;
            this.authenticate.getClient(client).subscribe(user => {
                this.client = user;
            });
        } else {
            this.clientBoard = false;
        }

    }
    showClientOrders(id) {
        this.authenticate.getClientOrders(id).subscribe(ord => this.clientOrders = ord);
    }
    getNewOrder() {
        this.clientBoard = false;
        this.openBoard = false;
    }
}

