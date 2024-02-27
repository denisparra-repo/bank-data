import { TestBed } from '@angular/core/testing';

import { BankService } from './bank.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BankService', () => {
  let service: BankService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
