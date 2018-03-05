import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestDataSource } from '../admin/authenticate.admin';
import { Http, Request, RequestMethod } from '@angular/http';
import {Client} from './client.model';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    persona: Client;
    constructor(private datasource: RestDataSource, public client:Client) {
    }

    authenticate(email: string, password: string) {
        return this.datasource.authenticate(email, password);
    }
    get authenticated(): boolean {
        return this.datasource.auth_token != null;
    }
    getClient(client) {
        return this.datasource.getClient(this.client).subscribe(user =>{
            this.client = user;
        } );
    }
    clear() {
        this.datasource.auth_token = null;
    }
}
