import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { AccountTableComponent } from './account-table.component';
import { BankService } from '../bank.service';

import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

const storageMock = {
  has: jasmine.createSpy()
};

describe('AccountTableComponent', () => {
  let component: AccountTableComponent;
  let fixture: ComponentFixture<AccountTableComponent>;
  let spy: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: BankService,
          useValue: {
            getProducts: () => of([])
          }
        }
      ],
      declarations: [AccountTableComponent],
      imports: [TranslateModule.forRoot(), RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
