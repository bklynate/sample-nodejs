import { Component, OnInit } from '@angular/core';
import {Httpprovider} from '../../../services/http/http.service';
import { Shop } from '../../../interfaces/shop/shop';

@Component({
  selector: 'shop',
  template: `
  <div style="text-align:center">
  <h3>Shop List</h3>
  <table  align="center">
    <thead>
      <th>Id</th>
      <th>Shop Name</th>
    </thead>
    <tbody>
      <tr *ngFor="let shop of shops">
        <td>{{shop.id}}</td>
        <td><a routerLink="/shop/products/{{shop.id}}">{{shop.shop_name}}</a></td>
      </tr>
    </tbody>
  </table>
  </div>
  `,
})
export class ShopListComponent implements OnInit  {
  shops: Shop[] = [];
  constructor(private _http: Httpprovider) {

  }
  ngOnInit(){
    this._http.httpReq('http://localhost:9001/shops','GET',{}, '').subscribe((shops)=>{
      this.shops = shops.results;
    });
  }

}
