import { Component, OnInit} from '@angular/core';
import { AuthService } from '../model/auth.service';
import { Client } from '../model/client.model';
import { NgForm } from '@angular/forms';
import { StaticClients } from '../model/client.repository';
import { RestDataSource } from '../admin/authenticate.admin';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    providers: [AuthService, StaticClients, RestDataSource],
    templateUrl: './profile.component.html'
})
export class ProfileComponent{
    messageSuccess = null;
    newVerif: boolean;
    welcomeMessage = null;
    activateStoreButton = false;
    private person;
    constructor(
        public authenticate: AuthService,
        public client: Client,
        private dataClients: StaticClients,
        private dataSource: RestDataSource,
        private router: Router) {
            if (this.client.connect === true){
                this.dataSource.getClient(this.client).subscribe(user => {
                    this.client = user;
                    this.client.connect = true;
                });
            }
        } 

    submitProfile() {
        if (this.client.connect !== true) {
            this.client.access = false;
            this.dataSource.addClient(this.client)
                .subscribe(c => {
                    this.client = c;
                });
            this.welcomeMessage = 'Votre profile est enregistré';
            this.client.connect = true;
            this.activateStoreButton = true;
        } else {
            this.dataSource.updateClient(this.client).subscribe(user => this.client = user);
            this.messageSuccess = 'Votre profil a été mis à jour!';
        }

    }
    goToShop() {
        this.router.navigateByUrl('/store');
    }
}
