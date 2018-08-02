import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NumberValidator } from '../../shared/CustomValidators';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidator.range(1, 5)],
      tags: this.fb.array([]),
      description: ''
    });
  }

}
