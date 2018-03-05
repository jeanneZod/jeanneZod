import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { StaticProducts } from '../model/product.repository';
import { Cart } from '../model/cartDetail.model';
import { Router } from '@angular/router';
import { RestDataSource } from '../admin/authenticate.admin';
import { AuthService } from '../model/auth.service';
import { Client } from '../model/client.model';
import { CamelCase } from '../model/pipeTransform';
@Component({
    selector: 'app-cart-detail',
    providers: [StaticProducts, AuthService, RestDataSource, CamelCase],
    templateUrl: './cartDetail.component.html'
})
export class CartDetailComponent {
errorMessage: string;
username: string;
password: string;
    constructor(private data: StaticProducts,
        public cart: Cart, private router: Router,
        private auth: AuthService,
        private client: Client) {
            
    }
    imgSrc(src: string) {
        return this.data.imgSrc(src);
    }
goToPayment(cart: Cart) {
    if (this.client.connect) {
        this.router.navigateByUrl('/checkout');
    } else {
        this.router.navigateByUrl('/connexion');
    }
}
    removeLine(id: number) {
        this.cart.removeLine(id);
    }
}

