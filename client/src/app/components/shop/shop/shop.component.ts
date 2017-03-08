import { Component } from '@angular/core';

@Component({
  selector: 'shop',
  template: `
  <div style="text-align:center">
    <h1></h1>
    <a routerLink="/shop/addproduct">Add Product</a>
    <a routerLink="/shop">Shop List</a>
    <router-outlet></router-outlet>
  </div>
  `,
})
export class ShopComponent  {

}
