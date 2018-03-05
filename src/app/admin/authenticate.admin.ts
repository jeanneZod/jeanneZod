import { Injectable } from '@angular/core';
import { Http, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Product } from '../model/product.model';
import { Cart } from '../model/cartDetail.model';
import { Client } from '../model/client.model';
import { Order } from '../model/order.model';
import 'rxjs/add/operator/map';



const PROTOCOL = 'http';
const PORT = 3500;

@Injectable()
export class RestDataSource {
    baseUrl: string;
    auth_token: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    authenticate(email: string, pass: string) {
        return this.http.post(this.baseUrl + 'login', JSON.stringify({ email: email, pass: pass }),
            {
                headers: new HttpHeaders().append('Content-Type', 'application/json').set('Authorization', `Bearer<${this.auth_token}>`)
            }).map(response => {
                const r = <UserResponse>response;
                this.auth_token = r.success ? r.token : null;
                return r.success;
            });
    }
    adminAuthenticate(email: string, pass: string) {
        return this.http.post(this.baseUrl + 'loginAdmin', JSON.stringify({ email: email, pass: pass }),
            {
                headers: new HttpHeaders().append('Content-Type', 'application/json').set('Authorization', `Bearer<${this.auth_token}>`)
            }).map(response => {
                const r = <UserResponse>response;
                this.auth_token = r.success ? r.token : null;
                return r.success;
            });
    }
    getProducts(): Observable<Product[]> {

        return this.http.get<Product[]>(this.baseUrl + 'products', {
            headers: new HttpHeaders().append('Content-Type', 'application/json'),
            responseType: 'json',
            observe: 'body'
        });
    }
    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.baseUrl + 'clients', {
            responseType: 'json',
            observe: 'body'
        });
    }
    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.baseUrl + 'orders', {
            responseType: 'json',
            observe: 'body'
        });
    }
    getClient(client:  Client ): Observable<Client> {
        return this.http.get<Client>(this.baseUrl + `clients/${client.email}`, {
            responseType: 'json',
            observe: 'body'
        });
    }
    addClient(client: Client): Observable<Client> {
        return this.http.post<Client>(this.baseUrl + 'clients',
            client);
    }
    updateClient(client: Client): Observable<Client> {
        return this.http.put<Client>(this.baseUrl + `clients/${client._id}`,
             client);
    }
    saveOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.baseUrl + 'orders', order);
    }
    savePhotos(fileToUpload: string): Observable<any> {
        return this.http.post<any>(this.baseUrl + `photos/${fileToUpload}`, fileToUpload,
            {
                headers: new HttpHeaders().append('Content-Type', 'image/*')
            });
    }
    getPhoto(fileName: string): Observable<any> {
        return this.http.get<any>(this.baseUrl + `photos/${fileName}`,
            {
                headers: new HttpHeaders().append('Content-Type', 'image/*'),
                responseType: 'text' as 'json' }
            );
    }
    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(this.baseUrl + `products/${id}`, {
            responseType: 'json',
            observe: 'body'
        });
    }
    updateProduct(product: Product): Observable<Product> {
        return this.http.put<Product>(this.baseUrl + `products/${product._id}`, product);
    }
    deleteProduct(id: number): Observable<Product> {
        return this.http.delete<Product>(this.baseUrl + `products/${id}`);
    }
    addProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.baseUrl + 'products',
            product);
    }

    getOrder(id: number): Observable<Order> {
        return this.http.get<Order>(this.baseUrl + `orders/${id}`, {
            responseType: 'json',
            observe: 'body'
        });
    }
    deleteOrder(id: number): Observable<Order> {
        return this.http.delete<Order>(this.baseUrl + `orders/${id}`);
    }
    updateOrder(order: Order): Observable<Order> {
        return this.http.put<Order>(this.baseUrl + `orders/${order._id}`, order);
    }

    getClientOrders(id: number): Observable<Order[]> {
        return this.http.get<Order[]>(this.baseUrl + `clientsOrders/${id}`, {
            responseType: 'json',
            observe: 'body'
        });
    }

    /*
    getClients(): Observable<Client[]> {
        return this.sendRequest(RequestMethod.Get, 'clients');
    }

    addClient(client: Client): Observable<Client> {
        return this.sendRequest(RequestMethod.Post, 'clients',
            client, true);
    }
    updateClient(client: Client): Observable<Client> {
        return this.sendRequest(RequestMethod.Put,
            `clients/${client.id}`, client, true);
    }
    deleteProduct(id: number): Observable<Product> {
        return this.sendRequest(RequestMethod.Delete,
            `products/${id}`, null, true);
    }
    getOrders(): Observable<Order[]> {
        return this.sendRequest(RequestMethod.Get,
            'orders', null, true);
    }
    deleteOrder(id: number): Observable<Order> {
        return this.sendRequest(RequestMethod.Delete,
            `orders/${id}`, null, true);
    }
    updateOrder(order: Order): Observable<Order> {
        return this.sendRequest(RequestMethod.Put,
            `orders/${order.id}`, order, true);
    }
    saveOrder(order: Order): Observable<Order> {
        return this.sendRequest(RequestMethod.Post, 'orders', order);
    }*/

    /*private sendRequest(verb: RequestMethod,
        url: string, body?: Product | Order | Client, auth: boolean = false)
        : Observable<Product | Product[] | Order | Order[] | Client | Client[] | any> {
        const request = new HttpRequest({
            method: verb,
            url: this.baseUrl + url,
            body: body
        });
        if (auth && this.auth_token != null) {
            request.headers.set('Authorization', `Bearer<${this.auth_token}>`);
        }
        return this.http.request(request).map(response => response.json());
    }*/
}
interface UserResponse {
    success: boolean;
    token: string;
}
