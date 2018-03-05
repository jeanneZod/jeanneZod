import { Injectable } from '@angular/core';
import { Client } from './client.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { AuthService } from '../model/auth.service';
import { RestDataSource } from '../admin/authenticate.admin';

@Injectable()
export class StaticClients {
    private clients: Client[] = [
        {
            _id: 1, name: 'Moskvina',
            surname: 'Jeanne',
            email: 'jeanne_moskvina@yahoo.fr',
            password: 'secret',
            nickname: 'admin',
            address: '1, allée des Erables',
            city: 'Sannois',
            zip: '95110',
            country: 'France',
            connect: false
        }
    ];
    constructor(private authservice: AuthService) { }

    getClients(): Observable<Client[]> {
        return Observable.from([this.clients]);
    }

    
    getIdClient(id: number) {
        return this.clients.findIndex(c => c._id === id);
    }

    disconnect() {
        this.authservice.clear();
    }
    
}
