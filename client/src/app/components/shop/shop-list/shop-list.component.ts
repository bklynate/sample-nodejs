import { Component } from '@angular/core';
import {Httpprovider} from '../../../services/http/http.service';
import { Shop } from '../../../interfaces/shop/shop';

@Component({
  selector: 'shop',
  template: `
  <h3>Products List</h3>
  <table>
    <thead>
      <th>Id</th>
      <th>Shop Name</th>
    </thead>
    <tbody>
      <tr *ngFor="let product of products">
        <td>{{shop.id}}</td>
        <td><a routerLink="/shop/products/{{shop.id}}">{{shop.shop_name}}</a></td>
      </tr>
    </tbody>
  </table>
  `,
})
export class ShopListComponent  {
  shops: Shop[] = [];
  constructor(private _http: Httpprovider) {

  }
  ngOnInit(){
    //this._http.httpReq()
  }

}
