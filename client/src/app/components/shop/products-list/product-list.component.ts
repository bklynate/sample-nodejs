import { Component } from '@angular/core';
import { Product } from '../../../interfaces/product/product';
import {Httpprovider} from '../../../services/http/http.service';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'product-list',
  template: `
  <div style="text-align:center">
  <h3>Products List</h3>
  <h5>Add OR Edit Products</h5>
  <form (ngSubmit)="onSubmit(addproduct, 'add')">
    <input type="text" [(ngModel)]="addproduct.id" [ngModelOptions]="{standalone:true}" hidden>
    <input type="text" [(ngModel)]="addproduct.category" [ngModelOptions]="{standalone:true}">
    <input type="text" [(ngModel)]="addproduct.product" [ngModelOptions]="{standalone:true}">
    <input type="text" [(ngModel)]="addproduct.discount" [ngModelOptions]="{standalone:true}">
    <input type="text" [(ngModel)]="addproduct.price" [ngModelOptions]="{standalone:true}">
    <input type="submit" value="Submit">
  </form>
  <br>
  {{msg}}
  <br>
  <table align="center">
    <thead>
      <th>Id</th>
      <th>Category</th>
      <th>Product</th>
      <th>Discount</th>
      <th>Price</th>
      <th>Delete</th>
    </thead>
    <tbody>
      <tr *ngFor="let product of products">
        <td>{{product.id}}</td>
        <td>{{product.category}}</td>
        <td>{{product.product}}</td>
        <td>{{product.discount}}</td>
        <td>{{product.price}}</td>
        <td><a (click)="onEdit(product, 'edit')" href="#" >Edit</a></td>
        <td><a (click)="onDelete(product)" href="#" >Delete</a></td>
      </tr>
    </tbody>
  </table>
  </div>
  `,
})
export class ProductListComponent  { 
  products: Product[] = [];
  params: string;
  addproduct: any = {
    id: '',
    category: '',
    product: '',
    discount: '',
    price: ''
  };
  option: string = 'add';
  msg: string = '';

  constructor(private _http: Httpprovider, private _activatedRoute: ActivatedRoute) {

  }

  onEdit(product: any, option: any) {

    this.addproduct = product;
    this.option = 'edit';
    return false;

  }
  onSubmit(addproduct: any) {
    var req: any;
    let that = this;
    if (this.option === 'add') {
      req = {
        category: addproduct.category,
        product: addproduct.product,
        discount: addproduct.discount,
        price: addproduct.price
      };
      this._http.httpReq('/shop/' + this.params + '/product/', 'POST', req, '').subscribe((products) => {
          that.option = 'add';
          if(products.status === 'Success'){
            that.addproduct = {
              id: '',
              category: '',
              product: '',
              discount: '',
              price: ''
            };
            that.msg = 'Form Submitted and Data Entered successfully'
          }
      });
    } else {
      req = {
        category: addproduct.category,
        product: addproduct.product,
        discount: addproduct.discount,
        price: addproduct.price
      };
      this._http.httpReq('/shop/' + this.params + '/product/' + addproduct.id, 'PUT', req, '').subscribe((products) => {
          that.option = 'add';
          if(products.status === 'Success'){
            that.addproduct = {
              id: '',
              category: '',
              product: '',
              discount: '',
              price: ''
            };
            that.msg = 'Form Submitted and Data Changed successfully'
          }
      });
    }
    return false;

  }
  onDelete(product: Product) {

    let that = this;
    this._http.httpReq('/shop/' + this.params + '/product/' + product.id, 'DELETE', {}, '').subscribe((products) => {
        for (let i = 0; i < that.products.length; i++) {
          if (product.id === that.products[i].id && products.status === 'Success') {
            that.products.splice(i, 1);
          }
        }
    });
    return false;

  }
  ngOnInit() {

    this._activatedRoute.params.subscribe((params) => {
      this.params = params['shopid'];
      this._http.httpReq('/shop/' + this.params + '/products', 'GET', {}, '').subscribe((products) => {
        this.products = products.results;
      });
    });

  }
}
