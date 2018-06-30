import { Component } from '@angular/core';
import { ProductService } from './products/product.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  /*
  - Providers are defined in Angular component or Angular module metadata
  - ProductService is the provider since it returns ProductService class (Self is provider)
  - ProductService is now available to AppComponent and all of its nested components
  */
  providers: [ProductService]
})
export class AppComponent {
  title = 'Acme Product Management';
}
