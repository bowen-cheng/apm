import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
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
  private productUrl: string = 'api/products';

  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  static errorHandler(error: HttpErrorResponse) {
    console.error(error.message);
    return throwError(error.message);
  }

  static extractData(response: Product[]): Product[] {
    return response || [];
  }

  static handleError(error: HttpErrorResponse): Observable<any> {
    console.error(error);
    return throwError(JSON.stringify(error) || 'Server error');
  }

  static initializeProduct(): Product {
    // Return an initialized object
    return {
      id: 0,
      productName: null,
      productCode: null,
      tags: [''],
      releaseDate: null,
      price: null,
      description: null,
      starRating: null,
      imageUrl: null
    };
  }

  constructor(private http: HttpClient) {
  }

  getProduct(id: number): Observable<Product> {
    if (id === 0) {
      // If Id is 0, then this is a blank form for a new product
      return of(ProductService.initializeProduct());
    }
    const url = `${this.productUrl}/${id}`;
    return this.http.get(url).pipe(
      map(ProductService.extractData),
      tap(data => console.log('getProductById: ' + JSON.stringify(data))),
      catchError(ProductService.handleError)
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl).pipe(
      map(ProductService.extractData),
      tap((data: Product[]) => console.log(`Data retrieved: ${JSON.stringify(data)}`)),
      catchError(ProductService.errorHandler)
    );
  }

  deleteProduct(id: number): Observable<Product> {
    const url = `${this.productUrl}/${id}`;

    return this.http.delete(url, this.options).pipe(
      tap(data => console.log('deleteProduct: ' + JSON.stringify(data))),
      catchError(ProductService.handleError)
    );
  }

  saveProduct(product: Product): Observable<Product> {
    if (product.id === 0) {
      return this.createProduct(product);
    }
    return this.updateProduct(product);
  }

  private createProduct(product: Product): Observable<Product> {
    product.id = undefined;
    return this.http.post(this.productUrl, product, this.options).pipe(
      map(ProductService.extractData),
      tap(data => console.log('createProduct: ' + JSON.stringify(data))),
      catchError(ProductService.handleError)
    );
  }

  private updateProduct(product: Product): Observable<Product> {
    const url = `${this.productUrl}/${product.id}`;
    return this.http.put(url, product, this.options).pipe(
      map(() => product),
      tap(data => console.log('updateProduct: ' + JSON.stringify(data))),
      catchError(ProductService.handleError)
    );
  }
}
