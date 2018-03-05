import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CamelCase } from './model/pipeTransform';
import { AppComponent } from './app.component';
import {StoreComponent} from './store/store.component';
import { StaticProducts } from './model/product.repository';
import { StaticClients } from './model/client.repository';

import { CategoriesComponent } from './store/categories.component';
import { ProductComponent } from './store/productPage.component';
import { CartDetailComponent } from './store/cartDetail.component';
import { HeaderComponent } from './store/header.component';
import { CartSummaryComponent } from './store/cartSummary.component';
import { RouterModule } from '@angular/router';
import { Order } from './model/order.model';
import { Client } from './model/client.model';
import { Cart } from './model/cartDetail.model';
import { Product } from './model/product.model';
import { RestDataSource } from './admin/authenticate.admin';
import { StoreFirstGuard } from './storeFirst.guard';

import { AuthService} from './model/auth.service';
import { CheckoutComponent } from './store/checkout.component';
import { ConnexionComponent } from './store/connexion.component';
import { NewClientSubscriptionComponent } from './store/newClientSubscription.component';
import { AdministationConnectComponent } from './admin/administrationConnect.admin';
import { ProfileComponent } from './store/profile.component';
import { AdminEditorComponent } from './admin/adminEditor.component';
import { AdminEditOrderComponent } from './admin/adminEditOrder.component';
import { AdminEditProductComponent } from './admin/adminEditProduct.component';
import { getProductsComponent } from './admin/getProducts.component';
import { getOrdersComponent } from './admin/getOrders.component';
@NgModule({
  declarations: [
    AppComponent, StoreComponent, CamelCase,
    CategoriesComponent, ProductComponent,
    CartDetailComponent, HeaderComponent,
    CartSummaryComponent, ProfileComponent,
    CheckoutComponent, ConnexionComponent, NewClientSubscriptionComponent,
    AdministationConnectComponent, AdminEditorComponent, AdminEditOrderComponent,
    AdminEditProductComponent,getOrdersComponent,getProductsComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    FormsModule,
    Ng2DeviceDetectorModule.forRoot(),
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: '/store' },
      {
        path: 'store', component: StoreComponent,
        canActivate: [StoreFirstGuard]
      },
      {
        path: 'product', component: ProductComponent
      },
      {
        path: 'cart', component: CartDetailComponent,
        canActivate: [StoreFirstGuard]
      },
      {
        path: 'checkout', component: CheckoutComponent,
        canActivate: [StoreFirstGuard]
      },
      {
        path: 'connexion', component: ConnexionComponent,
         canActivate: [StoreFirstGuard]
      },
      {
        path: 'profile', component: ProfileComponent,
         canActivate: [StoreFirstGuard]
      },
      {
        path: 'newClientSubscription', component: NewClientSubscriptionComponent,
         canActivate: [StoreFirstGuard]
      },
      {
        path: 'connect/administrationZodiaque', component: AdministationConnectComponent,
        canActivate: [StoreFirstGuard]
      },
      {
        path: 'editor', component: AdminEditorComponent, 
        children: [
          {path: "products", component: getProductsComponent},
          {path: "orders", component: getOrdersComponent}
      ]
      },
      {
        path: 'edit/order', component: AdminEditOrderComponent,
        canActivate: [StoreFirstGuard]
      },
      {
        path: 'edit/product', component: AdminEditProductComponent,
        canActivate: [StoreFirstGuard]
      },
      { path: '**', redirectTo: '/store' }
    ])
  ],
  providers: [StaticProducts, Cart, Order, Client, Product, RestDataSource, AuthService, StaticClients, StoreFirstGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
