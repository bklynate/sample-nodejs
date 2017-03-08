import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import {AddShopComponent} from './components/admin/addshop/add-shop.component';
import {EditProductComponent} from './components/shop/edit-product/edit-product.component';
import {ProductListComponent} from './components/shop/products-list/product-list.component';
import { ShopComponent } from './components/shop/shop/shop.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { ShopListComponent } from './components/shop/shop-list/shop-list.component';

import {routes, appRoutingProviders} from './routes/app.routes';
import {Httpprovider} from './services/http/http.service';

@NgModule({
  imports:      [ BrowserModule, CommonModule, FormsModule, HttpModule, routes ],
  declarations: [ 
    AppComponent, AddShopComponent, ShopComponent, AdminComponent, ShopListComponent, 
    EditProductComponent, ProductListComponent, HomeComponent,
  ],
  providers: [appRoutingProviders, Httpprovider],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
