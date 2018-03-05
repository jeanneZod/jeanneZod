import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { RestDataSource } from '../admin/authenticate.admin';
import { Cart } from '../model/cartDetail.model';
import { Routes, Router, ActivatedRoute, Params } from '@angular/router';
import { CamelCase } from '../model/pipeTransform';
import { StaticProducts, } from '../model/product.repository';

@Component({
    selector: 'app-product-page',
    providers: [RestDataSource, CamelCase],
    templateUrl: './productPage.component.html'
})
export class ProductComponent {
    private productId: number;
    private product:Product;
    constructor(private data: RestDataSource, private staticProd: StaticProducts, private activatedRoute: ActivatedRoute, public cart: Cart, private router: Router) {
        this.activatedRoute.queryParams
            .subscribe((queryParams: Params) => {
                this.productId = queryParams['id'];
            });
        this.data.getProduct(this.productId).subscribe(prod => {
            this.product = prod;
            if(this.product.images !== undefined){
                this.data.getPhoto(this.product.images[0]).subscribe(photo => { 
                    if (photo !== null){
                      this.product.image1 = photo; 
                    }
                    })

            }
        });
    }
    imgSrc(src: string) {
        return this.staticProd.imgSrc(src);
    }
    addToCart(product) {
        this.cart.addLine(product);
        this.router.navigateByUrl('/cart');
    }
}
