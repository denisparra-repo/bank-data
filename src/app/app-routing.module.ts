import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountTableComponent } from './account-table/account-table.component';
import { CreateProductComponent } from './create-product/create-product.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AccountTableComponent },
  { path: 'product/:id', component: CreateProductComponent },
  { path: 'product', component: CreateProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
