import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  // This component will not be nested into any component, so we don't need an selector
  // selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = 'Product Detail';
  product: Product;

  constructor(private route: ActivatedRoute, private _productService: ProductService) {
  }

  ngOnInit() {
    // The '+' symbol is a JS shortcut for converting strings to numbers
    const id: number = +this.route.snapshot.paramMap.get('id');

    this._productService.getProducts().subscribe((products: Product[]) => {
      this.product = products.filter(value => value.productId === id).pop();
    });
  }
}
