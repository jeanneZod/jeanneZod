import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from '../model/product.model';
import { StaticProducts } from '../model/product.repository';
import { Cart } from '../model/cartDetail.model';
import { Router, Routes, ActivatedRoute } from '@angular/router';
import { RestDataSource } from '../admin/authenticate.admin';
import { AuthService } from '../model/auth.service';
import { Client } from '../model/client.model';
import { Order } from '../model/order.model';
import { LocalDate } from '../model/pipeDateTransorm';
import { DatePipe } from '@angular/common';
import {getProductsComponent} from './getProducts.component';
import {getOrdersComponent} from './getOrders.component';
@Component({
    selector: 'app-administration-editor [xx]=',
    providers: [StaticProducts, AuthService, RestDataSource, LocalDate, DatePipe],
    templateUrl: './adminEditor.component.html'
})
export class AdminEditorComponent {
openboard: boolean;

    constructor(private data: StaticProducts,
        public cart: Cart, private router: Router,
        private auth: AuthService,
        private authenticate: RestDataSource,
        public client: Client,
        private activatedRoute: ActivatedRoute,
        private order: Order) {
            if(this.activatedRoute.snapshot.url[0].path == 'editor'){
                this.openboard = true;
            }
        }

       
        /*getProducts(){
            this.ordersList = null;
            this.toggleClass();
            if (this.client.connect === true && this.client.access === true) {
                this.productsList = this.authenticate.getProducts();
                this.productsList.subscribe(prods => this.prods = prods)
            }else {
                return false;
            }
        }
        getOrders(){
            this.productsList = null;
            this.toggleClass();
            if (this.client.connect === true && this.client.access === true) {
                 this.ordersList = this.authenticate.getOrders();
                 this.ordersList.subscribe(ords => this.ords = ords)
            }else {
                return false;
            }
        }
       
        toggleClass() {
            const lis = document.getElementsByClassName('categoryAdmin');
            Array.from(lis).forEach(el => el.classList.remove('active'));
            const span = <HTMLElement>event.target;
            const li = span.parentElement;
            li.classList.add('active');
        }*/



}

