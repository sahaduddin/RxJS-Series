import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { OperatorsListComponent } from './operators-list/operators-list.component';
import { OperatorDetailComponent } from './operator-detail/operator-detail.component';

const routes: Routes = [
  { path: '', component: OperatorsListComponent },
  { path: ':id', component: OperatorDetailComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    OperatorsListComponent,
    OperatorDetailComponent
  ]
})
export class OperatorsModule { }
