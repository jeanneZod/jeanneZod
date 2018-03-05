import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { StaticProducts, } from '../model/product.repository';

import { RestDataSource } from '../admin/authenticate.admin';
import { CategoriesComponent } from './categories.component';
import { Router } from '@angular/router';


@Component({
    selector: 'app-store',
    providers: [StaticProducts, CategoriesComponent, RestDataSource],
    templateUrl: './store.component.html'
})
export class StoreComponent {

    public selectedCategory: string;
    public selectedPage = 1;
    public productsPerPage = 10;
    public disable = false;

    constructor(private data: RestDataSource,
        private staticProd: StaticProducts,  private categories: CategoriesComponent, private router: Router) { }

    get products(): Product[] {
 
        const pageIndex = (this.selectedPage - 1) * this.productsPerPage;
        return this.staticProd.getProducts(this.selectedCategory)
            .slice(pageIndex, pageIndex + this.productsPerPage);
    }

    changeCat(event) {
        this.selectedCategory = event;
        this.changePage(1);
    }
    changePage(newPage: number) {
        const pages = Array.from(document.getElementsByClassName('pageNumber'));
        const selection = <HTMLElement>event.target;
        if (pages.length >= 1) {
            pages.forEach(page => page.classList.remove('disabled'));
            selection.classList.add('disabled');
        }
        this.selectedPage = newPage;
    }

    get pageNumbers(): number[] {
        return Array(Math.ceil(this.staticProd.getProducts(this.selectedCategory).length / this.productsPerPage))
            .fill(0).map((x, i) => i + 1);
    }
    imgSrc(src: string) {
       
        return this.staticProd.imgSrc(src);
    }
    navigate(route) {
        this.router.navigate([`/${route}`]);
    }
}
