import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import {  timer } from 'rxjs';
import {  map, switchMap, take } from 'rxjs/operators';
import { BankService } from './bank.service';

export function checkIdValidator(
    usernameService: BankService,
): AsyncValidatorFn {
    return (control: AbstractControl) => {
        return timer(500).pipe(
            switchMap(() =>
                usernameService.getProduct(control.value)
                .pipe(map((result) => result ? {asyncInvalid: true} : null)))
        );
    };
}