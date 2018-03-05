import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../model/product.model';
import { StaticProducts } from '../model/product.repository';
import { Ng2DeviceService } from 'ng2-device-detector';
import { NgClass } from '@angular/common';
import { RestDataSource } from '../admin/authenticate.admin';
@Component({
    selector: 'app-categories',
    providers: [StaticProducts, RestDataSource],
    templateUrl: './categories.component.html'
})
export class CategoriesComponent {
    newClass: string;
    newCategory: string;
    categories: string[];
    @Output()
    changeCategory: EventEmitter<string> = new EventEmitter<string>();

    constructor(private data: RestDataSource, private staticProd: StaticProducts, private deviceDetect: Ng2DeviceService) {
        this.data.getProducts().subscribe(prods => {
            this.categories = prods.map(prod => prod.category).filter((c, index, array) => array.indexOf(c) === index);
        });
    }
    sortProducts(cat: string) {
        this.changeCategory.emit(cat);
        const spans = document.getElementsByClassName('categoryName');
         Array.from(spans).forEach(el => el.classList.remove('active'));

        const span = <HTMLElement>event.target;
        span.classList.add('active');

    }
}

