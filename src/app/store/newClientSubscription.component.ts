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
    templateUrl: './newClientSubscription.component.html'
})
export class NewClientSubscriptionComponent {
    private clients: Client[] = [];
    errorMessage: string = null;
    chosenType = 'password';
    submitContinue: boolean;
    constructor(private router: Router, public client: Client, private auth: AuthService, private dataSource: RestDataSource) { }

submitNewProfile(person) {
    this.verifyInputs(person);

    if (this.submitContinue) {
        this.dataSource.getClient(this.client).subscribe(user => {
            this.client = user;
            if (this.client === null) {
                this.client = person;
            } 
        });
        if (this.client === person) {

            this.router.navigateByUrl('/profile');
            } else {
            this.errorMessage = 'Votre profil existe déjà';
            }

    }else {
        this.errorMessage = 'Merci de vérifier vos informations';
    }

}
changePassType(type: string) {
    type === 'password' ? this.chosenType = 'text' : this.chosenType = 'password';
}
verifyInputs(client) {
    const first = <HTMLInputElement>document.getElementsByClassName('newEmail')[0];
    const second = <HTMLInputElement>document.getElementsByClassName('newPassword')[0];
    if (first.value === '' || second.value === '') {
        first.classList.add('is-invalid');
        second.classList.add('is-invalid');
        return this.submitContinue = false;
    } else {
        return this.submitContinue = true;
    }
}
}

