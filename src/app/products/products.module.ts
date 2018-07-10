import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailGuard } from './product-detail/product-detail.guard';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  imports: [
    RouterModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
      }
    ]),
    SharedModule
  ],
  declarations: [
    ProductDetailComponent,
    ProductListComponent
  ]
})
export class ProductsModule {
}
