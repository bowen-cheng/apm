import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductEditComponent } from './product-edit/product-edit.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ProductsRoutingModule
  ],
  declarations: [
    ProductDetailComponent,
    ProductListComponent,
    ProductEditComponent
  ]
})
export class ProductsModule {
}
