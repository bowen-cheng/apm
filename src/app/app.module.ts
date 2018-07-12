import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // ProductModule must be imported before AppRoutingModule for proper routing mapping
    ProductsModule,
    AppRoutingModule
  ],
  // Registering a service in Angular modules is deprecated since V6
  // providers: [ProductDetailGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
