import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';
import { AuthService } from '../model/auth.service';
import { Client } from '../model/client.model';
import { StaticClients } from '../model/client.repository';

@Component({
    selector: 'app-header',
    providers: [AuthService, StaticClients],
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    connected = false;
    constructor(private router: Router, public auth: AuthService, public client: Client, private service: StaticClients)
    {}
    ngOnInit() {
        return this.auth.authenticated;
    }
    disconnect() {
        this.service.disconnect();
    }
}
