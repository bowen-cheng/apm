import { browser, by, element } from 'protractor';

export class ProductListPage{
  navigateTo() {
    return browser.get('/products');
  }

  getPageTitle() {
    return element(by.css('.panel-heading'));
  }
}
