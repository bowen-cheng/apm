import { Component, OnInit } from '@angular/core';

import { Product } from '../product';

@Component({
  // This component will not be nested into any component, so we don't need an selector
  // selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = 'Product Detail';
  product: Product;

  constructor() {
  }

  ngOnInit() {
  }
}
