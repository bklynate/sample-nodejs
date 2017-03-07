import { Component } from '@angular/core';
import { Product } from '../../../interfaces/product/product';
import {Httpprovider} from '../../../services/http/http.service';

@Component({
  selector: 'product-list',
  template: `
  <h3>Products List</h3>
  <table>
    <thead>
      <th>Id</th>
      <th>Category</th>
      <th>Product</th>
      <th>Discount</th>
      <th>Price</th>
    </thead>
    <tbody>
      <tr *ngFor="let product of products">
        <td>{{product.id}}</td>
        <td>{{product.category}}</td>
        <td>{{product.product}}</td>
        <td>{{product.discount}}</td>
        <td>{{product.price}}</td>
      </tr>
    </tbody>
  </table>
  `,
})
export class ProductListComponent  { 
  products: Product[] = [];
  constructor(private _http: Httpprovider) {

  }
  ngOnInit(){
    //this._http.httpReq()
  }
}
