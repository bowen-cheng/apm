import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from './product';

/*
 *  @Injectable() is only needed if this service actually has an injected dependency of its own. But
 *  it is a good practice to add this decorator to every service class.
 */
@Injectable()
export class ProductService {

  // this path is relative to tsconfig.app.json
  private _productUrl: string = './api/products/products.json';

  static errorHandler(error: HttpErrorResponse) {
    console.error(error.message);
    return Observable.throw(error.message);
  }

  constructor(private _http: HttpClient) {
  }

  getProduct(id: number): Observable<Product> {
    return this.getProducts().pipe(
      map((products: Product[]) => products.find(p => p.productId === id)));
  }

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this._productUrl)
      .pipe(
        tap((data: Product[]) => console.log(`Data retrieved: ${JSON.stringify(data)}`)),
        catchError(ProductService.errorHandler)
      );
  }
}
