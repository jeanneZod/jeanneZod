import { Component} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StaticProducts } from '../model/product.repository';
import { Cart } from '../model/cartDetail.model';
import { Router, Routes } from '@angular/router';
import { RestDataSource } from '../admin/authenticate.admin';
import { AuthService } from '../model/auth.service';
import { Client } from '../model/client.model';
import { Order } from '../model/order.model';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';



@Component({
    selector: 'app-adminOrders-editor',
    providers: [StaticProducts, AuthService, RestDataSource ],
    templateUrl: './adminEditorChoice.component.html'
})
export class getOrdersComponent implements OnInit {
ordersList: Observable<Order[]> ;
ords: Order[];

productsList ;
    constructor(private data: StaticProducts,
        public cart: Cart, private router: Router,
        private auth: AuthService,
        private authenticate: RestDataSource,
        private order: Order,
        public client: Client) {
        }



        ngOnInit(){
            
            this.productsList = null;

            if (this.client.connect === true && this.client.access === true) {
                 this.ordersList = this.authenticate.getOrders();
                 this.ordersList.subscribe(ords => this.ords = ords)
            }else {
                return false;
            }
        }
        




}

