import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { ProductEditComponent } from './product-edit.component';

@Injectable({ providedIn: 'root' })
export class ProductEditGuard implements CanActivate, CanDeactivate<ProductEditComponent> {

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }

  canDeactivate(component: ProductEditComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean {
    if (component.productForm.dirty) {
      const productName = component.productForm.get('productName').value || 'New Product';
      return confirm(`Are you sure to discard all changes to ${productName}?`);
    }
  }
}
