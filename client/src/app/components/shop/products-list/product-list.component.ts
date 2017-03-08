import { Component } from '@angular/core';
import { Product } from '../../../interfaces/product/product';
import {Httpprovider} from '../../../services/http/http.service';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'product-list',
  template: `
  <div style="text-align:center">
  <h3>Products List</h3>
  <table align="center">
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
  </div>
  `,
})
export class ProductListComponent  { 
  products: Product[] = [];
  params: string;
  constructor(private _http: Httpprovider, private _activatedRoute: ActivatedRoute) {

  }
  ngOnInit(){
    this._activatedRoute.params.subscribe((params)=>{
      this.params = params.shopid;
      this._http.httpReq('http://localhost:9001/shop/'+this.params+'/products','GET',{}, '').subscribe((products)=>{
        this.products = products.results;
      });
    });
  }
}
