import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  errorMessage: string;
  product: Product;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private router: Router) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!!id) {
      // The '+' symbol is a JS shortcut for converting strings to numbers
      this.productService.getProduct(+id).subscribe(
        product => this.product = product,
        error => this.errorMessage = <any>error
      );
    }
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
