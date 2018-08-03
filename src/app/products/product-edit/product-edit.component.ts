import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NumberValidator } from '../../shared/CustomValidators';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit {

  protected id;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.fb.group({
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
    this.route.params.subscribe(
      params => {
        this.id = +params['id'];
      }
    );
  }

}
