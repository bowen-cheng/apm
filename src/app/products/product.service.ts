import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

import { Product } from './product';

/*
 *  @Injectable() is only needed if this service actually has an injected dependency of its own. But
 *  it is a good practice to add this decorator to every service class.
 */
@Injectable()
export class ProductService {

  // this path is relative to tsconfig.app.json
  private _productUrl: string = './api/products/products.json';

  constructor(private _http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this._productUrl)
        .do((data: Product[]) => console.log(`Data retrieved: ${JSON.stringify(data)}`))
        .catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error.message);
    return Observable.throw(error.message);
  }
}
