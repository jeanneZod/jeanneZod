import { Injectable } from '@angular/core';


@Injectable()
export class Product {

        public id?: number;
        public _id?: number;
        public name?: string;
        public category?: string;
        public description?: string;
        public price?: number;
        public image1?: string;
        public images?: Array<string>;
        public available?: number;
}
