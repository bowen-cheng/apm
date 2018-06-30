import { Injectable } from '@angular/core';

import { Product } from './product';

/*
 *  @Injectable() is only needed if this service actually has an injected dependency of its own. But
 *  it is a good practice to add this decorator to every service class.
 */
@Injectable()
export class ProductService {

  getProducts(): Product[] {
    return [
      {
        'productId': 1,
        'productName': 'Leaf Rake',
        'productCode': 'gdn-0011',
        'releaseDate': 'March 19, 2016',
        'description': 'Leaf rake with 48-inch wooden handle.',
        'price': 19.95,
        'starRating': 3.2,
        'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png'
      },
      {
        'productId': 2,
        'productName': 'Garden Cart',
        'productCode': 'gdn-0023',
        'releaseDate': 'March 18, 2016',
        'description': '15 gallon capacity rolling garden cart',
        'price': 32.99,
        'starRating': 4.2,
        'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png'
      },
      {
        'productId': 5,
        'productName': 'Hammer',
        'productCode': 'tbx-0048',
        'releaseDate': 'May 21, 2016',
        'description': 'Curved claw steel hammer',
        'price': 8.9,
        'starRating': 4.8,
        'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png'
      },
      {
        'productId': 8,
        'productName': 'Saw',
        'productCode': 'tbx-0022',
        'releaseDate': 'May 15, 2016',
        'description': '15-inch steel blade hand saw',
        'price': 11.55,
        'starRating': 3.7,
        'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png'
      },
      {
        'productId': 10,
        'productName': 'Video Game Controller',
        'productCode': 'gmg-0042',
        'releaseDate': 'October 15, 2015',
        'description': 'Standard two-button video game controller',
        'price': 35.95,
        'starRating': 4.6,
        'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png'
      }
    ];
  }
}
