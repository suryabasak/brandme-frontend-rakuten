import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActiveComponent } from './active.component';
import { ReceivedComponent } from './received/received.component';
import { PostedComponent } from './posted/posted.component';

const routes: Routes = [
  {
    path: '',
    component: ActiveComponent,
    children: [
      { path: '', redirectTo: 'received', pathMatch: 'full' },
      {
        path: 'received',
        component: ReceivedComponent
      },
      {
        path: 'posted',
        component: PostedComponent
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActiveRoutingModule { }
