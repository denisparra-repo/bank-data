import { Component, OnInit } from '@angular/core';

import { BankService } from '../bank.service';
import { Account } from '../account';

@Component({
  selector: 'app-account-table',
  templateUrl: './account-table.component.html',
  styleUrl: './account-table.component.css'
})
export class AccountTableComponent implements OnInit {

  context: any
  products: Account[] = [];
  total = 12

  constructor(private bankService : BankService) {}
  
  ngOnInit(): void {
    this.bankService.getProducts()
      .subscribe(products => {
        this.products = products; 
        this.total = products.length
        const selectValue = Number((document.getElementById('resultPerPage') as HTMLSelectElement).value);
        if (selectValue < products.length) {
          this.total = selectValue;
        } else {
          this.total = products.length
        }
        this.products = products.slice(0, selectValue);
      });
  }

  openMenu($event: any) {
    console.log($event.target.classList)
    this.context = $event.target
    $event.target.classList.add('active')
  }

  edit () {
    this.context.classList.remove('active')
  }
  
  remove() {
    this.context.classList.remove('active')
  }

  onChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.bankService.getProducts()
      .subscribe(products => {
        if (value.length === 0) {
          this.products = products; 
          this.total = products.length
        } else {
          this.products = products.filter(product => 
            product.name.toLowerCase().includes(value.toLocaleLowerCase()) || 
            product.description.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
          this.total = this.products.length;  
        }});
    
  }

  changeNumberOfRows(event: any) {
    this.bankService.getProducts()
      .subscribe(products => {
        const recordsLength = Number(event.target.value);
        if (recordsLength < products.length) {
          this.total = recordsLength;
        } else {
          this.total = products.length
        }
        this.products = products.slice(0, Number(event.target.value));
      });
  }
}
