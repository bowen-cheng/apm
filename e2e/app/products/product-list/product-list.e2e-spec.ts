import { ProductListPage } from './product-list.po';

describe('Product list page', () => {
  let page: ProductListPage;

  beforeEach(() => {
    page = new ProductListPage();
  });

  it('should display page title', () => {
    page.navigateTo();
    expect(page.getPageTitle().getText()).toEqual('Product List');
  });
});
