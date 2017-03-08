import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <div style="text-align:center">
    <h1>Simple SaaS Product Catalog</h1>
    <a routerLink="/admin">Admin</a>
    <a routerLink="/shop">Shop</a>
    <router-outlet></router-outlet>
  </div>
  `,
})
export class AppComponent  { name = 'Sample SAAS supported Shop product listing'; }
