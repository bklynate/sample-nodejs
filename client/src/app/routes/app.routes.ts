import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes } from '@angular/router';

import { AddShopComponent } from '../components/admin/addshop/add-shop.component';
import { AddProductComponent } from '../components/shop/add-product/add-product.component';
import { EditProductComponent } from '../components/shop/edit-product/edit-product.component';
import { ProductListComponent } from '../components/shop/products-list/product-list.component';
import { ShopComponent } from '../components/shop/shop/shop.component';
import { AdminComponent } from '../components/admin/admin/admin.component';
import { HomeComponent } from '../components/home/home.component';

const appRoutes: Routes = [
    {path:"", component: HomeComponent},
    {path:"shop", component: ShopComponent, children:[
        {path:"", component: ProductListComponent},
        {path:"products", component: ProductListComponent},
        {path:"addproduct", component: AddProductComponent},
        {path:"editProduct", component: EditProductComponent}
    ]},
    {path:"admin", component: AdminComponent, children:[
        {path:"", component: AddShopComponent}
    ]},
    {path:"**", component: HomeComponent}
];

export const appRoutingProviders:any[] = [

];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);