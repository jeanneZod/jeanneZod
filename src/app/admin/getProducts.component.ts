import { Component, OnInit, Input} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from '../model/product.model';
import { StaticProducts } from '../model/product.repository';
import { Cart } from '../model/cartDetail.model';
import { Router, Routes } from '@angular/router';
import { RestDataSource } from '../admin/authenticate.admin';
import { AuthService } from '../model/auth.service';
import { Client } from '../model/client.model';
import {AdminEditorComponent} from '../admin/adminEditor.component';


@Component({
    selector: 'app-adminProducts-editor',
    providers: [StaticProducts, AuthService, RestDataSource ],
    templateUrl: './adminEditorChoice.component.html'
})
export class getProductsComponent implements OnInit{

productsList: Observable<Product[]> ;
prods:Product[];
ordersList;
openboard = false;
    constructor(private data: StaticProducts,
        public cart: Cart, private router: Router,
        private auth: AuthService,
        private authenticate: RestDataSource,
        private adm:AdminEditorComponent,
        public client: Client) {
            
        }

        ngOnInit(){

            this.ordersList = null;
            this.openboard = true;
            if (this.client.connect === true && this.client.access === true) {
                this.productsList = this.authenticate.getProducts();
                this.productsList.subscribe(prods => this.prods = prods)
            }else {
                return false;
            }
        }
       


}

