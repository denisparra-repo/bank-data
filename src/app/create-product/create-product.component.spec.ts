import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankService } from '../bank.service';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CreateProductComponent } from './create-product.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: BankService,
          useValue: {}
        },
        FormBuilder
      ],
      declarations: [CreateProductComponent],
      imports: [TranslateModule.forRoot(), RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
