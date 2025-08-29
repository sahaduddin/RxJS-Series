import { Routes } from '@angular/router';
import { PromiseComponent } from './promise/promise.component';
import { ObservablesComponent } from './observables/observables.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './observables/list/list.component';
import { FromEventComponent } from './observables/from-event/from-event.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ObserverComponent } from './observer/observer.component';
import { SubjectComponent } from './subject/subject.component';
import { OneYearComponent } from './interview/one-year/one-year.component';
import { TwoYearComponent } from './interview/two-year/two-year.component';
import { ThreeYearComponent } from './interview/three-year/three-year.component';
import { FourYearComponent } from './interview/four-year/four-year.component';
import { InterviewListComponent } from './interview/interview-list/interview-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'promise', component: PromiseComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'observer', component: ObserverComponent },
  { path: 'subject', component: SubjectComponent },
  { path: 'observables', component: ObservablesComponent ,
    children:[
      {path: 'list', component: ListComponent},
      {path: 'fromEvent', component: FromEventComponent}
    ]
   },
  { 
    path: 'operators', 
    loadChildren: () => import('./operators/operators.module').then(m => m.OperatorsModule)
  },
  { path: 'interview', component: InterviewListComponent },
  { path: 'interview/one-year', component: OneYearComponent },
  { path: 'interview/two-year', component: TwoYearComponent },
  { path: 'interview/three-year', component: ThreeYearComponent },
  { path: 'interview/four-year', component: FourYearComponent }
];
