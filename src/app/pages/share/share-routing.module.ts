import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShareComponent } from './share/share.component';

const routes: Routes = [
  {
    path: '',
    component: ShareComponent,
    children: [
      { path: '', redirectTo: 'active', pathMatch: 'full' },
      {
        path: 'active',
        loadChildren: () => import('./active/active.module').then(m => m.ActiveModule)
      },
      {
        path: 'brands',
        loadChildren: () => import('./brands/brands.module').then(m => m.BrandsModule)
      },
      {
        path: 'personal',
        loadChildren: () => import('./personal/personal.module').then(m => m.PersonalModule)
      },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShareRoutingModule { }
