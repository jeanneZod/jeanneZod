import { Component, OnInit, Input} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from '../model/product.model';
import { StaticProducts } from '../model/product.repository';
import { Cart } from '../model/cartDetail.model';
import { Router, Routes,ActivatedRoute } from '@angular/router';
import { RestDataSource } from '../admin/authenticate.admin';
import { AuthService } from '../model/auth.service';
import { Client } from '../model/client.model';



@Component({
    selector: 'app-adminProducts-editor',
    providers: [StaticProducts, AuthService, RestDataSource ],
    templateUrl: './adminEditorChoice.component.html'
})
export class getProductsComponent implements OnInit{

productsList: Observable<Product[]> ;
prods:Product[];
ordersList;
openboard:boolean;
    constructor(private data: StaticProducts,
        public cart: Cart, private router: Router,
        private auth: AuthService,
        private authenticate: RestDataSource,
        private activatedRoute:ActivatedRoute,
        public client: Client) {
            
        }

        ngOnInit(){
            if(this.activatedRoute.snapshot.url[0].path == 'products'){
                this.openboard = false;
            }
            this.ordersList = null;
            if (this.client.connect === true && this.client.access === true) {
                this.productsList = this.authenticate.getProducts();
                this.productsList.subscribe(prods => this.prods = prods)
            }else {
                return false;
            }
        }
       


}

