import { ProductFilterPipe } from './products/product-filter.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { StarComponent } from './shared/star.component';
import { ProductService } from './products/product.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductFilterPipe,
    StarComponent
  ],
  providers: [
    ProductService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
