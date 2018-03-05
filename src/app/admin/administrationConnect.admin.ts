import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { StaticProducts } from '../model/product.repository';
import { Cart } from '../model/cartDetail.model';
import { Router } from '@angular/router';
import { RestDataSource } from '../admin/authenticate.admin';
import { AuthService } from '../model/auth.service';
import { Client } from '../model/client.model';
@Component({
    selector: 'app-administration-connect',
    providers: [StaticProducts, AuthService, RestDataSource],
    templateUrl: './adminConnexion.component.html'
})
export class AdministationConnectComponent {
    errorMessage:string = null;
    constructor(private data: StaticProducts,
        public cart: Cart, private router: Router,
        private auth: AuthService,
        private authenticate: RestDataSource,
        public client: Client) {
    }
    submitAdmin(client) {
        this.authenticate.adminAuthenticate(client.email, client.password)
            .subscribe(response => {
                if (response) {
                    this.client.connect = this.client.access = true;
                    this.router.navigate(['/editor']);
                }
                this.errorMessage = 'Merci de vérifier vos informations';
            });
    }

}

