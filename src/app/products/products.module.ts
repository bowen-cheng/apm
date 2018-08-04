import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { SharedModule } from '../shared/shared.module';
import { ProductData } from './product-data';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(ProductData),
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
