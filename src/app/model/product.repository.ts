import { Injectable, OnInit } from '@angular/core';
import { Product } from './product.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { RestDataSource } from '../admin/authenticate.admin';
import { DomSanitizer } from '@angular/platform-browser';
@Injectable()
export class StaticProducts  {
    private arrayProd: Product[] = [];
    private prod: Product;
    public image;
    public photo;
    constructor(private data: RestDataSource,  private sanitizer: DomSanitizer) {
        this.data.getProducts().subscribe(prods => {
            this.arrayProd = prods;
            this.arrayProd.map(product =>{
                if(product.images){
                    this.data.getPhoto(product.images[0]).subscribe(photo => { 
                        if (photo !== null){
                          product.image1 = photo; 
                        }
                        })

                }
            })
            
        });
    }
    getProducts(category: string = null): Product[] {
        return this.arrayProd.filter(p => category == null || category === p.category);
    }
    getProduct(id: number) {
        return  this.prod; 
    }
    imgSrc(src: string) {
        const str = `data:image/jpeg;base64,${src}`;
        return this.sanitizer.bypassSecurityTrustUrl(str);
    }
   
}
