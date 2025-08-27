import { Routes } from '@angular/router';
import { PromiseComponent } from './promise/promise.component';
import { ObservablesComponent } from './observables/observables.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './observables/list/list.component';
import { FromEventComponent } from './observables/from-event/from-event.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'promise', component: PromiseComponent },
  { path: 'observables', component: ObservablesComponent ,
    children:[
      {path: 'list', component: ListComponent},
      {path: 'fromEvent', component: FromEventComponent}
    ]
   }
];
