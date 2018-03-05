import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../model/auth.service';
import { RestDataSource } from '../admin/authenticate.admin';
import { Client } from '../model/client.model';
import { StaticClients } from '../model/client.repository';
@Component({
    selector: 'app-connexion',
    providers: [AuthService, StaticClients, RestDataSource],
    templateUrl: './connexion.component.html'
})
export class ConnexionComponent {
    private clients: Client[] = [];
    errorMessage: string = null;
    newClient = false;
    submitContinue = false;
    constructor(private router: Router, public client: Client, private auth: AuthService, private dataSource: RestDataSource) {}

    submitProfile(client) {
        this.verifyInputs(client);
        if (this.submitContinue === true){
            this.auth.authenticate(this.client.email, this.client.password)
            .subscribe(response => {
                if (response) {
                    window.history.back();
                   // this.router.navigateByUrl('/newClientSubscription');
                    this.client.connect = true;
                    this.auth.getClient(this.client);
                }
               this.errorMessage = 'Merci de vérifier vos informations';
            });
        }
        this.errorMessage = 'Merci de remplir les champs';

    }

    verifyInputs(client) {
        const first = <HTMLInputElement>document.getElementsByClassName('email')[0];
        const second = <HTMLInputElement>document.getElementsByClassName('password')[0];
        if (first.value === '' || second.value === '') {
            first.classList.add('is-invalid');
            second.classList.add('is-invalid');
            return this.submitContinue = false;
        } else {
            return this.submitContinue = true;
        }
    }

    goToNewClient() {
        this.router.navigateByUrl('/newClientSubscription');
    }

}
