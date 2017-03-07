import { Component } from '@angular/core';

@Component({
  selector: 'shop',
  template: `
  <h1></h1>
  <a routerLink="/shop/addproduct">Add Product</a>
  <a routerLink="/shop/products">Product List</a>
<router-outlet></router-outlet>
  `,
})
export class ShopComponent  {

}
