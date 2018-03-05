import { Injectable } from '@angular/core';

@Injectable()
export class Client {
    public _id?: number;
    public access?: boolean;
    public email?: string;
    public nickname?: string;
    public password?: string;
    public name?: string;
    public surname?: string;
    public address?: string;
    public city?: string;
    public zip?: string;
    public country?: string;
    public connect?: boolean;
    public newClient?: boolean;
}
