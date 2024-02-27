import { Component, OnInit } from '@angular/core';
import { BankService } from '../bank.service';

import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkIdValidator } from '../checkIdValidator';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit {

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    logo: new FormControl(''),
    date_release: new FormControl(''),
    date_revision: new FormControl(''),
  });

  productName = "Release date requerido";
  constructor(private bankService : BankService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        id: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10)
        ], [checkIdValidator(this.bankService)]],
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100)
          ]
        ],
        description: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(200)
          ]
        ],
        logo: [
          '',
          [
            Validators.required
          ]
        ],
        date_release: ['', Validators.required],
        date_revision: [{value:'', disabled: true}, Validators.required]
      }
    );
    this.hideModal();
    document.getElementById('productDateRelease')?.setAttribute('min', new Date().toISOString().substring(0,10));
  }

  openModal(event: Event) {
    event.preventDefault();
    this.displayModal()
  }

  reset() {
    this.form.reset();
    this.hideModal();
  }

  changeDate() {
    const dateRelease = document.getElementById('productDateRelease')  as HTMLInputElement;
    const selectedDate = new Date(dateRelease.value);
    selectedDate.setFullYear(selectedDate.getFullYear() + 1);
    const data = this.form.value;
    data.date_revision = selectedDate.toISOString().substring(0,10);
    this.form.patchValue(data);
  }

   saveData(event: Event) {
    event.preventDefault();
    console.log(this.form.value)
    this.bankService.addProduct(this.form.getRawValue()).subscribe(_ => this.form.reset())
   }

   hideModal() {
    const modal = document.getElementById('resetConfirmation');
    if (modal !== null) {
      modal.style.display = 'none';
    }
   }

   displayModal() {
    const modal = document.getElementById('resetConfirmation');
    if (modal !== null) {
      modal.style.display = 'block';
    }
   }
}
