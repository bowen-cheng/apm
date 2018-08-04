import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NumberValidator } from '../../shared/CustomValidators';
import { GenericValidator } from '../../shared/GenericValidator';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef })
  public formInputElements: ElementRef[];

  public productForm: FormGroup;

  protected product: Product;
  protected pageTitle: string;
  protected errorMessage: string;
  // Use with the generic validation message class
  protected displayMessage: { [key: string]: string } = {};
  protected genericValidator: GenericValidator;
  protected sub;
  protected validationMessages = {
    productName: {
      required: 'Product name is required.',
      minlength: 'Product name must be at least three characters.',
      maxlength: 'Product name cannot exceed 50 characters.'
    },
    productCode: {
      required: 'Product code is required.'
    },
    starRating: {
      range: 'Rate the product between 1 (lowest) and 5 (highest).'
    }
  };

  get tags(): FormArray {
    return <FormArray>this.productForm.get('tags');
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidator.range(1, 5)],
      tags: this.fb.array([]),
      description: ''
    });

    /* The snapshot approach retrieves the initial value from the route (URL) */
    // this.id = +this.route.snapshot.params['id'];

    /*
    If the user select a another product while on this page, the id will then change. Therefore, we use the observable
    approach. We will always have the latest ID.
    */
    this.sub = this.route.params.subscribe(
      params => { this.getProductById(+params['id']); }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    // Merge the blur event observable with the valueChanges observable
    merge(this.productForm.valueChanges, ...controlBlurs).pipe(debounceTime(800)).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.productForm);
    });
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteTag(i: number): void {
    this.tags.removeAt(i);
  }

  getProductById(id: number): void {
    this.productService.getProduct(id).subscribe(
      (product: Product) => this.onProductRetrieved(product),
      (error: any) => this.errorMessage = <any>error
    );
  }

  onProductRetrieved(product: Product): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;

    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }

    // Update the data on the form
    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      description: this.product.description
    });
    this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveProduct(): void {
    if (this.productForm.dirty && this.productForm.valid) {
      // Copy the form values over the product object values
      const p = Object.assign({}, this.product, this.productForm.value);

      this.productService.saveProduct(p)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    } else if (!this.productForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['/products']);
  }

}
