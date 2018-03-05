import { Injectable } from '@angular/core';
import { Cart } from './cartDetail.model';
import { Client } from './client.model';

@Injectable()
export class Order {
    public _id:number;
    public shipped = false;
    public date: Date;
    public payement?: string;
    public payed = false;
    public modified?: string;
    constructor(public cart: Cart, public client: Client) {
    }

    clear() {
        this.date = this.payement = null;
        this.shipped = false;
        this.cart.clear();
    }
}
