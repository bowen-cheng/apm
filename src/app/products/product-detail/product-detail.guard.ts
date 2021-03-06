import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

// Using the "providedIn" attribute of @Injectable decorator is now the recommended way of registering a service
@Injectable({ providedIn: 'root' })
export class ProductDetailGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // The URL of product details page consists of two parts: [0] is 'products', [1] is ':id'
    const productId = +next.url[1].path;
    if (isNaN(productId) || productId < 1 || productId > 10) {
      alert('Invalid id');
      this.router.navigate(['/products']);
      return false;
    }
    return true;
  }
}
